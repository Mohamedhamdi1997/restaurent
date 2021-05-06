import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";


const ImageListView = ({ eleve, isSelect, collect, onCheckItem, productToRemove, addFunc, id, title, img, props }) => {

  

 

  const [number, setNumber] = useState("4");
  const [searchterm, setsearchterm] = useState('');
   const [cart, setCart] = useState([]);
   const addToCart = (product) => {
  setCart([...cart, product]);
  
};







  return (
    
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={eleve.id}>
    <ContextMenuTrigger id="menu_id" data={eleve.id} collect={collect}>
      <Card
        onClick={event => onCheckItem(event, eleve.id)}
        className={classnames({
          active: isSelect
        })}
      >
        <div className="position-relative">
          <NavLink to={`?p=${eleve.id}`} className="w-40 w-sm-100">
            <CardImg top alt={eleve.nom} src={eleve.image} />
          </NavLink>
          <Badge
            color={eleve.statusColor}
            pill
            className="position-absolute badge-top-left"
          >
           
          </Badge>
        </div>
        <CardBody>
          <Row>
            
            <Colxx xxs="10" className="mb-3">
              <CardSubtitle>{eleve.nom}</CardSubtitle>
              ( Candidat )
              <CardText className="text-muted text-small mb-0 font-weight-light">
              {eleve.classe}
                
              </CardText>
              <CardText className="text-muted text-small mb-0 font-weight-light">
              <div class="iconsminds-birthday-cake" /> {eleve.dateN}
                
              </CardText>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </ContextMenuTrigger>
  </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);