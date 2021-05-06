import React, { Component, Fragment } from "react";
import { Row, Card,  CustomInput, Badge, CardBody, CardTitle, Table} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import Breadcrumb from "../../containers/navs/Breadcrumb";


const DataListEleves = ({ eleve, isSelect, collect, onCheckItem, index}) => {
  return (
    <Fragment>
        <Row>
          <Colxx xxs="12"  >
            
            <Separator className="mb-12"  />
          </Colxx>
        </Row>
        
    <Colxx xxs="12" className="mb-3" >
    <Card  >
      <CardBody >
        

        <Table striped>
          <thead >
            <tr key={index}>
              <th></th>
              <th>Nom</th>
              <th>Date de naissance</th>
              <th>classe</th>
            
              
              
            </tr>
          </thead >
          <tbody>
            <tr >
              <th scope="row" >  <img
              alt={eleve.nom}
              src={eleve.image}
              className="list-thumbnail responsive border-0 card-img-left"
            /></th>
              <td >{eleve.nom}</td>
              <td>{eleve.dateN}</td>
              <td>{eleve.classe}</td>
            </tr>
            <tr>
              <th scope="row">  <img
              alt={eleve.nom}
              src={eleve.image}
              className="list-thumbnail responsive border-0 card-img-left"
            /></th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">  <img
              alt={eleve.nom}
              src={eleve.image}
              className="list-thumbnail responsive border-0 card-img-left"
            /></th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  </Colxx>
  </Fragment>

  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListEleves);