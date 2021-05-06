import React, { Component, Fragment } from "react";
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


const apiUrl = servicePath + "/cakes/paging";
export default class ListeAuto extends Component {


  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');

    this.state = {
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

      products: [
        {
          id: 1,
          title: 'Mercedes',
          img: '/assets/img/mercedes.jpg',
          category: 'Cakes',
          createDate: '02.04.2018',
          status: 'ON HOLD',
          statusColor: 'primary',
          description: 'Wedding cake with flowers Macarons and blueberries',
          price:'100000 D',
          sales: 1647,
          stock: 62
        },
        {
          id: 2,
          title: 'Golf',
          category: 'Cupcakes',
          img: '/assets/img/golf.jpg',
          createDate: '01.04.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Cheesecake with chocolate cookies and Cream biscuits',
          price:'150000 D',
          sales: 1240,
          stock: 48
        },
        {
          id: 3,
          title: 'Moto',
          img: '/assets/img/moto.jpg',
          category: 'Cakes',
          createDate: '25.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Homemade cheesecake with fresh berries and mint',
          price:'1000D',
          sales: 1080,
          stock: 57
        },
        {
          id: 4,
          title: 'Moto Tunisien',
          img: '/assets/img/motot.jpeg',
          category: 'Cakes',
          createDate: '21.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Chocolate cake with berries',
          price:'800 D',
          sales: 1014,
          stock: 41
        }
      ],
      
    };
    
    
  }

 

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };


  
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

 
    
  
  

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  

 
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
        modalOpen

    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const categorie = this.state.products.map((product) => {
      if (this.state.displayMode === "imagelist") {
        return (
          <ImageListView
            key={product.id}
            product={product}
            isSelect={this.state.selectedItems.includes(product.id)}
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
        
          />

       
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
