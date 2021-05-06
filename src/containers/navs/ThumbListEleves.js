import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const ThumbListView = ({ eleve, isSelect, collect, onCheckItem }) => {

  
  return (
    <Colxx xxs="12" key={eleve.id} className="mb-3">
      
      <ContextMenuTrigger id="menu_id" data={eleve.id} collect={collect}>
      <NavLink to={`/app/bobo/edit/${eleve.id}`}>
      <Card
        
          className={classnames("d-flex flex-row", {
            active: isSelect
          })} 
        >
          
          <NavLink to={`?p=${eleve.id}`} className="d-flex">
            <img
              alt={eleve.nom}
              src={eleve.image}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${eleve.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {eleve.nom}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                Candidat
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {eleve.classe  }
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
              <div class="iconsminds-birthday-cake" /> {eleve.dateN}
                
              </p>
              
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <div class="iconsminds-pen" /> 
            </div>
          </div>
        </Card>
        </NavLink>
      </ContextMenuTrigger>
      
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);