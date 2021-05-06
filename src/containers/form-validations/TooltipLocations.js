import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";
import PostData from './eleves.json'

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import { Button, Label, Card, CardBody, Row,  InputGroup,
  InputGroupAddon,Input ,Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, Table } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

const selectData = [
  { label: "Masculin", value: "Masculin", key: 0 },
  { label: "Féminin", value: "Féminin", key: 1  }
];

class TooltipLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      selectedOptions: [],
      selectedOption: "",
      setName: [],
      name: []
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  handleChangeEmbedded = date => {
    this.setState({
      embeddedDate: date
    });
  };

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeDateTime = date => {
    this.setState({
      startDateTime: date
    });
  };

  handleChangeStart = date => {
    this.setState({
      startDateRange: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDateRange: date
    });
  };
  handleChangeMulti = selectedOptions => {
    this.setState({ selectedOptions });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  handleChanger = (e) => {
    const data = PostData.find((d) => d.id == e.target.value);
    if (data) {
            this.state.setName(data.name);
    }
  };

  render() {
    
    return (
      <Card className="mb-5">
        <CardBody>
          

          <AvForm
            className="av-tooltip mb-5 tooltip-label-right"
            onSubmit={this.handleSubmit}
          >
            <Row>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-0">
                  <Label>Nom</Label>
                  <AvInput name="input8" required />
                  <AvFeedback>saisir le nom</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-25">
                  <Label>Prénom</Label>
                  <AvInput name="input9" required />
                  <AvFeedback>saisir le prénom</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-50">
                  <Label>Date de naissance </Label>
                  <DatePicker
                    selected={this.state.startDateRange}
                     startDate={this.state.startDateRange}
                    endDate={this.state.endDateRange}
                    onChange={this.handleChangeStart}
                   />
                  <AvFeedback>error-l-50</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-75">
                  <Label>Lieu de naissance</Label>
                  <AvInput name="input11" required />
                  <AvFeedback>error-l-75</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-100">
                  <Label>Email</Label>
                  <AvInput name="input12" required />
                  <AvFeedback>error-l-100</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125">
                  <Label>Genre</Label>
                  <Select
                 
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={selectData}
          />
                  <AvFeedback>error-l-125</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-150">
                  <Label>Téléphone</Label>
                  <AvInput name="input14" required />
                  <AvFeedback>error-l-150</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-175">
                  <Label>Mobile</Label>
                  <AvInput name="input15" required />
                  <AvFeedback>error-l-175</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-200">
                  <Label>Niveau scolaire</Label>
                  <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button outline color="secondary" onClick={this.toggle}>
                      <IntlMessages id="Choisir" />
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                    <h1>Niveaux Scolaires</h1>
                    </ModalHeader>
                    <ModalBody>
                    <Table striped>
          <thead >
            <tr >
              <th></th>
              <th>Nom</th>
              <th>Code</th>
              <th>Niveau éducatif</th>
            
              
              
            </tr>
          </thead >
          <tbody>
            <tr >
              <th ><input aria-label="radio" type="radio" /></th>
              
             
              <td scope="row" >1ére année </td>
              <td >1ére</td>
              <td>Primaire</td>

            </tr>
            <tr >
            <th ><input aria-label="radio" type="radio" /></th>
              <td scope="row" > 2éme année </td>
              <td >2éme</td>
              <td>Primaire</td>
            
            </tr>
            <tr >
            <th ><input aria-label="radio" type="radio" /></th>
              <td scope="row" > 3éme année </td>
              <td >3éme</td>
              <td>Primaire</td>
            
            </tr>
          
          </tbody>
        </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                        OK
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Annuler
                      </Button>
                    </ModalFooter>
                  </Modal>
                   </InputGroupAddon>
                </InputGroup>
                  <AvFeedback>error-l-200</AvFeedback>
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-225">
                  <Label>Classe</Label>
                  <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button outline color="secondary">
                      <IntlMessages id="Choisir" />
                    </Button>
                   </InputGroupAddon>
                </InputGroup>
                  <AvFeedback>error-l-225</AvFeedback>
                </AvGroup>
              </Colxx>
          
                

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-250">
                  <Label>error-l-250</Label>
                  <AvInput name="input18" required />
                  <AvFeedback>error-l-250</AvFeedback>
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-275">
                  <Label>error-l-275</Label>
                  <AvInput name="input19" required />
                  <AvFeedback>error-l-275</AvFeedback>
                </AvGroup>
              </Colxx>
            </Row>
            <Button color="primary">Submit</Button>
          </AvForm>
           
          {PostData.map(postDetail => {
                return <div key= {postDetail.id}>{postDetail.nom}</div>
              })}
        </CardBody>
      </Card>
    );
  }
}

export default TooltipLocations;
