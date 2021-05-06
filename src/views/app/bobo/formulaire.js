import React, { Component, Fragment } from "react";
import { Row, CardImg} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import FormikBasicFieldLevel from "../../../containers/form-validations/FormikBasicFieldLevel";
import FormikBasicFormLevel from "../../../containers/form-validations/FormikBasicFormLevel";
import FormikCustomComponents from "../../../containers/form-validations/FormikCustomComponents";
import FormikCustomWithTopLabels from "../../../containers/form-validations/FormikCustomWithTopLabels";
import AvailityBasic from "../../../containers/form-validations/AvailityBasic";
import AvailityCustom from "../../../containers/form-validations/AvailityCustom";
import AvailityDefaultValues from "../../../containers/form-validations/AvailityDefaultValues";
import TooltipLocations from "../../../containers/form-validations/TooltipLocations";
import FormikValidationSchema from "../../../containers/form-validations/FormikValidationSchema";
import DatePickerExamples from "../../../containers/form-validations/DatePickerExamples";

export default class Formulaire extends Component {

    constructor(props) {
        super(props);
        this.state = {

            eleves: [
                {
                  id: 1,
                  image: '/assets/img/eleve1.jpg',
                  matricule: '20210002',
                  nom: 'Maha Hamdi',
                  dateN: '23 aout 2002',
                  classe: '8 éme',
                  genre: 'Masculin'
                },
                {
                  id: 2,
                  image: '/assets/img/eleve2.jpg',
                  matricule: '20210002',
                  nom: 'Ahmed Hamdi',
                  dateN: '29 Mai 2008',
                  classe: '2 éme',
                  genre: 'Masculin'
                },
                {
                  id: 3,
                  image: '/assets/img/eleve3.jpg',
                  matricule: '20210002',
                  nom: 'Mohamed Hamdi',
                  dateN: '10 avr 1997',
                  classe: 'Bac',
                  genre: 'Masculin'
                },
                {
                  id: 4,
                  image: '/assets/img/eleve4.jpeg',
                  matricule: '20210002',
                  nom: 'Asma Hamdi',
                  dateN: '22 jan 1999',
                  classe: '9 éme',
                  genre: 'Masculin'
                }
              ]
        }}
    

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          <CardImg top alt={this.state.eleves.nom} src={this.state.eleves.image} />
            <Breadcrumb
              heading="Eléves"
              match={this.props.match}
            />  
            <Separator className="mb-5" />
          </Colxx>
        </Row>
       

        <Row>
          <Colxx xs="12">
            <h5 className="mb-4">Tooltip Positioning</h5>
            <TooltipLocations />
            
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}