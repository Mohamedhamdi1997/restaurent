import React, { Component, Fragment ,useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
//import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import axios from "axios";
import { servicePath } from "../../../constants/defaultValues";
import DataListView from "../../../containers/navs/DataListView";
import ThumbListView from "../../../containers/navs/ThumbListView";
import ImageListView from "../../../containers/navs/ImageListView";
import AddNewModal from "../../../containers/navs/AddNewModal";
import Pagination from "../../../containers/navs/Pagination";
import ContextMenuContainer from "../../../containers/navs/ContextMenuContainer";
import ListPageHeading from "../../../containers/navs/ListPageHeading";
import { Link, NavLink } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Filter from './filter';




const apiUrl = servicePath + "/cakes/paging";

export default class ListeInf extends Component {
  
  

  constructor(props) {
    super(props);
    
   
    this.state = {
      
      counter : "0",
      selectedDish: null,
      filtredProducts: [],
      cartItems: [],
      cart: [],
      setCart: [],
      setsearchterm: '',


      //addToCart: [],
      displayMode: "imagelist",
      selectedPageSize: 8,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [8, 12, 24],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      
      selectedOrderOption: { column: "title", label: "Product Name" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,  
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,

      products : [
        {
          id: 1,
          title: 'PC',
          img: '/assets/img/pc1.jpeg',
          category: 'Cakes',
          createDate: '02.04.2018',
          status: 'NEW',
          statusColor: 'primary',
          description: 'Wedding cake with flowers Macarons and blueberries',
          price:'800 D',
          sales: 1647,
          stock: 62
        },
        {
          id: 2,
          title: 'Souris',
          category: 'Cupcakes',
          img: '/assets/img/souris.jpg',
          createDate: '01.04.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Cheesecake with chocolate cookies and Cream biscuits',
          price:'20 D',
          sales: 1240,
          stock: 48
        },
        {
          id: 3,
          title: 'Ecouteurs',
          img: '/assets/img/Kit.jpg',
          category: 'Cakes',
          createDate: '25.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Homemade cheesecake with fresh berries and mint',
          price:'10 D',
          sales: 1080,
          stock: 57
        },
        {
          id: 4,
          title: 'Casque',
          img: '/assets/img/casque.jpeg',
          category: 'Cakes',
          createDate: '21.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Chocolate cake with berries',
          price:'50 D',
          sales: 1014,
          stock: 41
        }
      ],  
      searchterm: '',
     
      
      
 
     
      
      
      
    };
    
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.addToCart = this.addToCart.bind(this);
    
  }

  incrumentCount = () => {
    this.setState({ counter: parseInt(this.state.counter)+1});
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  
  handleAddToCart(g, product){
    this.setState(state=> {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false ;
      cartItems.forEach(item => {
        if (item.id === product.id){
          productAlreadyInCart = true;
          item.count++;
        }
        
      });
      if (!productAlreadyInCart){
        cartItems.push({...product, count:1});
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    })
  }


  onDishSelect(product) {
    this.setState({ selectedDish: product});
  }

  
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

 /*addToCart = (product) => { 
    const exist = product.find((product) => product.id === product.id);
    if (exist) {
      
      setCart([...product, {...product}]);
    }
   //console.log("addToCart", product);
   const [cart, setCart] = useState ([]); 
   setCart([...cart, product]);

  //const cartItems = this.state.cartItems.slice();
  //  let alreadyInCart = false;
  
  //   alreadyInCart = true;
  
 };*/

 /*addToCart = (product) => {
  setCart([...cart, product]);
};*/

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  handleAddFunc(products) {
    const existingProduct = this.state.cart.filter(p => p.id === products.id);
    if (existingProduct.length > 0) {
      this.setState ({
        cart: [...this.state.cart, existingProduct[0]]
      });
    }
      

  }

 /* filterproduits = this.state.products.filter( prod => {
    return prod.name.toLocaleLowerCase().includes (this.state.searchterm.toLocaleLowerCase())
  })*/

  addToCart = (product) => {
    this.state.setCart([...this.state.cart, product]);
    
  };
  
  
  handleChangeSort(n){
    this.setState({sort: n.target.value});
    this.listProducts();
  }

  handleChangerSort(n){
    this.setState({sort: n.target.value});
    this.productsSelected();
  }
 
  listProducts() {
    this.setState(state => {
      if (state.sort !== ''){ 
      state.products.sort((a,b)=> (state.sort=== 'lowest')? (a.price < b.price?1:-1): (a.price > b.price?1:-1) )
    } else {
      state.products.sort((a,b)=> (a.id < b.id?1:-1));

    }
    return { filtredProducts: state.products};
    })
  }

  productsSelected () {
    this.setState(state => {
      if (state.sort !== ''){ 
      state.products.sort((a,b)=> (state.sort=== 'pc')? (a.title < b.title?1:-1): (a.title > b.title?1:-1) )
    } else {
      state.products.sort((a,b)=> (a.id < b.id?1:-1));

    }
    return { filtredProducts: state.products};
    })
  }
 

 
  render() {
    
    const{
        currentPage,
        displayMode,
        items,
        selectedPageSize,
        totalItemCount,
        selectedOrderOption,
        selectedItems,
        orderOptions,
        pageSizes,
        modalOpen,
        cart,
        setCart,
        addToCart,
        searchterm,
        setsearchterm
        

    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    //const { products, addToCart} = props;
    const categorie = this.state.products.map((product, idx) => {  
      
      if (this.state.displayMode === "imagelist") {
        return (
        
          <ImageListView
            key={product.id}
            addFunc={this.handleAddFunc.bind(this)}
            product={product}
            isSelect={this.state.selectedItems.includes(product.id)}
            addToCart = {() =>{alert('qsdksld')}} 
            name= 'fdlfkdl'
            
            //filterproduits= {this.filterproduits} 
            //addToCart={addToCart} 
            
          />
        

        );
      } else if (this.state.displayMode === "thumblist") {
        return (
          <ThumbListView
          key={product.id}
          product={product}
          isSelect={this.state.selectedItems.includes(product.id)}
        />

        );

      } else {
        return (
         
          <DataListView
          key={product.id}
          product={product}
          isSelect={this.state.selectedItems.includes(product.id)}
        />

        );
      }
    });
    
    return (
      <Fragment>
       
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Liste de catégories" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12" className="mb-4">
          
            
          <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize}
          handleChangeSort={this.handleChangeSort} count={this.state.products.length}
           />
             <button onClick={this.incrumentCount}>click me !</button><br/>
             {this.state.counter}
           
            
          </Colxx>
        </Row>
        <ListPageHeading
            heading="menu.image-list"
           
            
           
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            onSearchKey={this.onSearchKey}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={this.toggleModal}
            size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize}
            handleChangeSort={this.handleChangeSort} count={this.state.products.length}
        
          />
            <button>kdlkflds({cart.length})</button>

       
        <div className="container">
          <div className="row">

            {categorie} 
            {" "}
            
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
            <ContextMenuContainer
              onContextMenuClick={this.onContextMenuClick}
              onContextMenu={this.onContextMenu}
            />
           
          </div>
        </div>
       
          
      </Fragment>
    )
  }
}
