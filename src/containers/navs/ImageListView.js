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


const ImageListView = ({ product, isSelect, collect, onCheckItem, productToRemove, addFunc, id, title, img, props }) => {

  

  const [products] = useState ([
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
    },
  ]);

  const [number, setNumber] = useState("4");
  const [searchterm, setsearchterm] = useState('');
   const [cart, setCart] = useState([]);
   const addToCart = (product) => {
  setCart([...cart, product]);
  
};



const removeFromCart = (productToRemove) => {
  setCart(cart.filter(product => product != productToRemove ));
  
};



  return (
    
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.id}>
      
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
      <NavLink to={`/app/gogo/products/${product.id}`}>
    
        <Card
         
          className={classnames({
            active: isSelect
          })}
        >
          <div className="position-relative">
            <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
              <CardImg top alt={product.title} src={product.img} />
              
            </NavLink>
            <Badge
              color={product.statusColor}
              pill
              className="position-absolute badge-top-left"
            >
              {product.status}
              
            </Badge>
            <span  class="mb-1 badge badge-outline-primary badge-pill"
             
            >
              
            {product.price}
            
            </span><br/>
            <div class="iconsminds-dollar-sign-2" />
            <span>Qty</span>
            <input type="text"></input>
          
          </div>
         

          <CardBody>
         

          <button onClick={()=> addToCart(product)} class="mb-2 btn btn-success" >Add to cart</button>
          <button onClick={addToCart}>addToCart</button>
          <button key={product} onClick={() => this.props.onDishSelect(product)}>Remove</button> 
          <button onClick={ () => this.props.handleAddToCart(product)}>Ajouter Produit</button>
          
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${product.id}`}
                  checked={isSelect}
                  onChange={() => {}}   
                  label=""/>
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{product.title}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {product.date}
                  
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
        </NavLink>
      
      </ContextMenuTrigger>
    </Colxx>
    
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);