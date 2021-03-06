import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class DatePickerExamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment()
    };
  }
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

  render() {
    const { messages } = this.props.intl;

    return (
      <Row>
        <Colxx xxs="12" xl="8" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
               
              </CardTitle>
             
              
              <Row className="mb-5">
                <Colxx xxs="6">
                  <DatePicker
                    selected={this.state.startDateRange}
                    selectsStart
                    startDate={this.state.startDateRange}
                    endDate={this.state.endDateRange}
                    onChange={this.handleChangeStart}
                    placeholderText={messages["form-components.start"]}/>
                </Colxx>
                
              </Row>

              
            </CardBody>
          </Card>
        </Colxx>

        
      </Row>
    );
  }
}
export default injectIntl(DatePickerExamples);
