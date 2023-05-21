
import React, { useCallback, useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Export
} from 'devextreme-react/data-grid';
import { Box, DateBox, Form, SelectBox, TextBox } from 'devextreme-react';
import { Button } from 'devextreme-react/button'
import { ButtonItem, SimpleItem } from 'devextreme-react/form';
import axios from 'axios';
import { Item } from 'devextreme-react/box';
import { post } from '../../api/axios';
import { api_Send_Email_route, api_Calculate_Loan } from '../../api/apiRoutes';

import jsPDF from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter'
const  FormData  = require('form-data');


const exportFormats = ['pdf', 'email']

export default function Task() {

  const paymentFrequency = ["Monthly", "Quaterly", "6 Months", "Annually"]

  const bankNames = ["Bank A", "Bank B"]

  const interestType = ["Flat Rate", "Reducing Balance"]

  const onExporting = useCallback((e) => {
    console.log(e)

    const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5,
      }).then(() => {

        if (e.format === 'email') {
      
          sendEmailtoUser(doc)
        }
        else {
        //console.log("doc",doc.([]))
         doc.save("LoanCalculation.pdf")
        
        }

      })


  })

   const sendEmailtoUser =(doc = jsPDF)=>{
    var  reader = new window.FileReader();
    reader.readAsArrayBuffer(doc.output("blob"))

  
    reader.onloadend = function()
    {

      var form = new FormData();

     form.append('file', reader.result,"loan.pdf");

      console.log(form)

      // var config = {
      //   method: 'post',
      //   url: 'https://localhost:44350/api/SendEmail',
      //   headers: {
      //     'content-type': 'application/pdf'
      //   },
      //   data: reader.result
      // };

      post(api_Send_Email_route, form, {
        headers:{
          
          ...form.getHeaders()
        }
      })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log("Error sending email",error);
      });



    }
  




   }



  const colCountByScreen = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4
  };

  const [loanAmount, setLoanAmount] = useState("")
  const [loanPeriod, setLaonPeriod] = useState("")
  const [paymentFreq, setPaymentFreq] = useState(paymentFrequency[0])
  const [interestTypes, setInterestType] = useState(interestType[0])
  const [bankName, setBankName] = useState(bankNames[0])
  const [startDate, setStartDate] = useState(new Date())
  const [calculateLoanResponse, setValue] = useState([])

  // const axios = require('axios')

  const onCalculateLaon = () => {

    const calclulateLoan = {
      AmountToBorrow: Number(loanAmount),
      LoanPeriod: Number(loanPeriod),
      PaymentFrequency: paymentFreq,
      InterestType: interestTypes,
      Bank: bankName,
      StartDate: startDate

    };
    // return postData(calclulateLoan)
    post(api_Calculate_Loan,calclulateLoan)
    .then((response)=> {

      let data = response.data.result
      let count = 1
      data.forEach(row => {

        row.count = count++
        row.balance = getCurrency(row.balance)
        row.interest = getCurrency(row.interest)
        row.principle = getCurrency(row.principle)

      });


      setValue(data)


    }, (rejected)=>{
      alert("Request Failed ")
    })
    .catch(function (error) {
      console.log(error);
    });
    //.then((data) => {

    // setValue(data.result)
    // console.log(data); // JSON data parsed by `data.json()` call
    // });


  }

  const postData =(data = {}) =>{
  


  }

  const getCurrency = (sAmount) => {

    return Number(sAmount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'KSH',
    })
  }

  const onTextBoxValChange = (e) => {
    console.log(e)
  }
  const onFiledChanged = (e) => {

    console.log(e)
  }

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Loan Repayments</h2>


      <div className={'content-block dx-card responsive-paddings'}>
        <Form
          id={'form'}
          // defaultFormData={state}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}

        >
          <SimpleItem >
            <TextBox onValueChange={(e) => { setLoanAmount(e) }} value={loanAmount} label='Loan Amount'>

            </TextBox>

          </SimpleItem>


          <SimpleItem >
            <TextBox onValueChange={(e) => { setLaonPeriod(e) }} value={loanPeriod} label='Loan Period In Months'>

            </TextBox>
          </SimpleItem>


          <SimpleItem>
            <SelectBox label='Payment Frequency' dataSource={paymentFrequency} value={paymentFreq} onValueChange={(e) => { setPaymentFreq(e) }} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <SelectBox label='Interest Type' dataSource={interestType} value={interestTypes} onValueChange={(e) => { setInterestType(e) }} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <SelectBox label='Bank Name' dataSource={bankNames} value={bankName} onValueChange={(e) => { setBankName(e) }} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <DateBox label='Start Date' value={startDate} onValueChange={(e) => { setStartDate(e) }} >

            </DateBox>

          </SimpleItem>


        </Form>

        {/* <div>
          <h6>Total Loan Amount = {200000}</h6>
        </div> */}

        <div>
          {/* <SimpleItem> */}
          <Button text='Calculate' type='normal' onClick={onCalculateLaon}>

          </Button>
          {/* </SimpleItem> */}
        </div>
      </div>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={calculateLoanResponse}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onExporting={onExporting}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />


        {/* <FilterRow visible={true} /> */}

        <Column dataField={'count'} alignment={'center'} caption={'#'} hidingPriority={2} />
        <Column dataField={'balance'} alignment={'center'} caption={'Balance'} hidingPriority={2} />
        <Column
          alignment={'center'}
          dataField={'interest'}
          caption={'Interest'}
          hidingPriority={6}
        />
        <Column
          alignment={'center'}
          dataField={'principle'}
          caption={'Installments'}
          hidingPriority={5}
        >
        </Column>


      </DataGrid>
    </React.Fragment>
  )
}

const dataSource = {
  store: {
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
