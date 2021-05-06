/*import React, { Component, Fragment ,useEffect, useState } from "react";
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



export default function Second(props) {
  const [cart] = useState ([]);
  const {cartItems, addToCart} = props;
  return (
    <Fragment>
    <Row>
      <Colxx xxs="12">
        
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <p><IntlMessages id="menu.second"/></p>
        <div>
           {cart.length  === 0 && <div>Cart is Empty</div>}   
           </div>

      </Colxx>
        
     
    </Row>
    
  </Fragment>
  );
}*/
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
import ImageListView from "../../../containers/navs/ImageListView 1";
import AddNewModal from "../../../containers/navs/AddNewModal";
import Pagination from "../../../containers/navs/Pagination";
import ContextMenuContainer from "../../../containers/navs/ContextMenuContainer";
import ListPageHeading from "../../../containers/navs/ListPageHeading";
import { Link, NavLink } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListeInf from "../gogo/listInfo";
import Basket from './basket';

const PAGE_CART = 'cart';
const PAGE_PRODUCTS = 'products';
const apiUrl = servicePath + "/cakes/paging";
export default class Second extends Component {


  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.mouseTrap = require('mousetrap');

    this.state = {

      selectedDish: null,

      cartItems: [],
    
     
      setCart: [],
      
      page: PAGE_PRODUCTS,
      setPage: PAGE_PRODUCTS,

      addToCart: [],
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
     
     

     
      cart : [
        
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
        }


      
      ],
      
    };
    
    this.addToCart = this.addToCart.bind(this);
    
  }

 

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

    
  addToCart = (product) => {
    this.state.setCart([...this.state.cart, product]);
    
  };
  
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

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
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

  renderDish(product) {
    if (product != null)
        return(
            <Card>
                <CardImg top src={product.img} alt={product.name} />
                <CardBody>
                  <CardTitle>{product.title}</CardTitle>
                  <CardText>{product.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
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
        addToCart
        

    } = this.state;

    const { cartItems } = this.props;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    
   
   /* const categorie = this.state.cart.map((product, idx) => {  
      if (this.state.displayMode  === "imagelist") {
        return (
          PAGE_CART &&
          
          <ImageListView
            key={idx}
            product={product}
            cart={cart}
          
         
            
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
    });*/
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
            addToCart={addToCart}
        
          />
            

       
        <div className="container">
          <div className="row">
          
          <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
            {" "}
            <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                </div>
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

