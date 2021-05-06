import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";

import { servicePath } from "../../../constants/defaultValues";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
//import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

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

export default class Start extends Component {


  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');

    this.state = {
      displayMode: "thumblist",
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
          title: 'Informatique',
          img: '/assets/img/pc.jpeg',
          category: 'Cakes',
          createDate: '02.04.2018',
          status: 'NEW',
          statusColor: 'primary',
          description: 'Wedding cake with flowers Macarons and blueberries',
          sales: 1647,
          stock: 62
        },
        {
          id: 2,
          title: 'Livre',
          category: 'Cupcakes',
          img: '/assets/img/livre.jpg',
          createDate: '01.04.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Cheesecake with chocolate cookies and Cream biscuits',
          sales: 1240,
          stock: 48
        },
        {
          id: 3,
          title: 'Mode',
          img: '/assets/img/mode.jpg',
          category: 'Cakes',
          createDate: '25.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Homemade cheesecake with fresh berries and mint',
          sales: 1080,
          stock: 57
        },
        {
          id: 4,
          title: 'Auto & Moto',
          img: '/assets/img/moto.jpeg',
          category: 'Cakes',
          createDate: '21.03.2018',
          status: 'PROCESSED',
          statusColor: 'secondary',
          description: 'Chocolate cake with berries',
          sales: 1014,
          stock: 41
        }
      ],
      
    };
    
    
  }

  componentDidMount() {
    this.dataListRender();
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }
  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };

  

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };
   
  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  };
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
          selectedOrderOption.column
        }&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.totalPage,
          items: data.data,
          selectedItems: [],
          totalItemCount: data.totalItem,
          isLoading: true
        });
      });
  }
 
  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

 
  render() {
    const{
      currentPage,
      items,
      displayMode,
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

          onCheckItem={(event, product_id)=>{
            console.log("Hello from here");
          }}
        />
               
        );

      } else {
        return (
         
          <DataListView
          key={product.id}
          product={product}
          isSelect={this.state.selectedItems.includes(product.id)}
          
          onCheckItem={(event, product_id)=>{
          console.log(product_id);
          }}
          
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
         
            <p><IntlMessages id="Liste" /></p>
        
           
            
          </Colxx>
        </Row>
        
        <ListPageHeading
            heading="menu.image-list"
            displayMode={displayMode}
            changeDisplayMode={this.changeDisplayMode}
            handleChangeSelectAll={this.handleChangeSelectAll}
            changeOrderBy={this.changeOrderBy}
            changePageSize={this.changePageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
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
        <AddNewModal
          modalOpen={modalOpen}
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
