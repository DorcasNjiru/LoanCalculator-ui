import React, { useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';
import { DateBox, Form, SelectBox, TextBox } from 'devextreme-react';
import {Button} from 'devextreme-react/button'
import { ButtonItem, SimpleItem } from 'devextreme-react/form';

export default function Task() {

  const paymentFrequency = ["Monthly", "Quaterly", "6 Months", "Annually"]

  const bankNames = ["Bank A", "Bank B"]

  const interestType = ["Flat Rate", "Reducing Balance"]




  const colCountByScreen = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4
  };

  const [loanAmount,setLoanAmount] = useState(0)
  const [loanPeriod,setLaonPeriod] = useState(0)
  const [paymentFreq,setPaymentFreq] = useState(paymentFrequency[0])
  const [interestTypes,setInterestType] = useState(interestType[0])
  const [bankName,setBankName] = useState(bankNames[0])
  const [startDate,setStartDate] = useState( new Date())
  const [calculateLoanResponse, setValue] = useState([])

const onCalculateLaon = () => {

  const calclulateLoan = {

    LaonAmount: loanAmount,
    LaonPeriod: loanPeriod,
    PaymentFrequency: paymentFreq,
    InterestType: interestTypes,
    BankName: bankName,
    StartDate: startDate,

  };
  postData("https://example.com/Calculateloan", calclulateLoan).then((data) => {

  setValue(data.result)
  console.log(data); // JSON data parsed by `data.json()` call
});


}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const onTextBoxValChange =(e) =>{
 console.log(e)
}
const onFiledChanged =(e)=>{

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
            <TextBox  onValueChange={(e)=>{setLoanAmount(e)}} value={loanAmount}   label='LaonAmount'>

            </TextBox>

          </SimpleItem>


          <SimpleItem >
            <TextBox onValueChange={(e)=>{setLaonPeriod(e)}}  value= {loanPeriod} label='LaonPeriod'>

            </TextBox>
          </SimpleItem>


          <SimpleItem>
            <SelectBox label='PaymentFrequency' dataSource={paymentFrequency} value= {paymentFreq}  onValueChange={(e)=>{setPaymentFreq(e)}} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <SelectBox label='InterestType' dataSource={interestType} value= {interestTypes}  onValueChange={(e)=>{setInterestType(e)}} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <SelectBox label='BankName' dataSource={bankNames} value= {bankName}  onValueChange={(e)=>{setBankName(e)}} >
            </SelectBox>
          </SimpleItem>

          <SimpleItem>
            <DateBox label='StartDate' value= {startDate}  onValueChange={(e)=>{setStartDate(e)}} >

            </DateBox>

          </SimpleItem>


        </Form>

        <div>
          <h6>Total Loan Amount = {200000}</h6>
        </div>

        <div>
          {/* <SimpleItem> */}
            <Button text='Calculate' type='normal'  onClick={onCalculateLaon}>
              
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
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={'Balance'} width={90} hidingPriority={2} />
        <Column
          dataField={'Status'}
          caption={'Interest'}
          hidingPriority={6}
        />
        <Column
          dataField={'Priority'}
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
