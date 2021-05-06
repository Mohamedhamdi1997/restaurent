import React, { Component } from "react";
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";

import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../components/svg";
import { createFilter } from "react-select";
class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      setsearchterm: '',
      searchterm: '',
      filter:"",


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
      
      
    };

   
  }

 
  
  
  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit =()=> {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  render() {
    const { messages } = this.props.intl;
    const {
      displayMode,
      changeDisplayMode,
      handleChangeSelectAll,
      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      match,
      startIndex,
      endIndex,
      selectedItemsLength,
      itemsLength,
      onSearchKey,
      orderOptions,
      pageSizes,
      toggleModal,
      heading
    } = this.props;

   

    const { displayOptionsIsOpen, dropdownSplitOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>
              
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={()=>toggleModal()}>
                <IntlMessages id="pages.add-new" />
              </Button>
              {"  "}
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={this.toggleSplit}>
                <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      checked={selectedItemsLength >= itemsLength}
                      onChange={() => handleChangeSelectAll(true)}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItemsLength > 0 &&
                            selectedItemsLength < itemsLength
                              ? "indeterminate"
                              : ""
                          }`}
                        />
                      }
                    />
                </div>
                <DropdownToggle
                  caret
                  color="primary"
                  className="dropdown-toggle-split btn-lg"/>
                <DropdownMenu right>
                  <DropdownItem>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={this.toggleDisplayOptions}
            >
              <IntlMessages id="pages.display-options" />{" "}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions">
              <span className="mr-3 d-inline-block float-md-left">
                <a
                  href="#/"
                  className={`mr-2 view-icon ${
                    displayMode === "list" ? "active" : ""
                  }`}
                  onClick={() => changeDisplayMode("list")}>
                  <DataListIcon />
                </a>
                <a
                  href="#/"
                  className={`mr-2 view-icon ${
                    displayMode === "thumblist" ? "active" : ""
                  }`}
                  onClick={() => changeDisplayMode("thumblist")}>
                  <ThumbListIcon />
                </a>
                <a
                  href="#/"
                  className={`mr-2 view-icon ${
                    displayMode === "imagelist" ? "active" : ""
                  }`}
                  onClick={() => changeDisplayMode("imagelist")}>
                  <ImageListIcon />
                </a>
              </span>
                          
              <div className="d-block d-md-inline-block pt-1">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <DropdownMenu >
                  <DropdownItem  value={this.props.sort}
                        onChange={this.props.handleChangeSort}>
                    <IntlMessages value="lowest" id="lowest" />
                    </DropdownItem>
                    <DropdownItem>
                    <IntlMessages value="highest" id="highest" />
                    </DropdownItem>
                    </DropdownMenu>
                   
                    
                    
                  </DropdownToggle>
                  
                 
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input 
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onChange={this.handleChange}
                    //onKeyPress={e => onSearchKey(e)}
                    
                  />
                    
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                <UncontrolledDropdown className="d-inline-block">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    {selectedPageSize}
                  </DropdownToggle>
                 
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);