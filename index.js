// Your code here

// Function populates a field properties from the elements from passed array of employee details
let createEmployeeRecord = (employeeCard) => {
  return {
    firstName: employeeCard[0],
    familyName: employeeCard[1],
    title: employeeCard[2],
    payPerHour: employeeCard[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

// Converts each emploee Array into an employee record using createEmployeeRecord and accumulates it to a new Array
let createEmployeeRecords = (employeesCardsData) => {
  return employeesCardsData.map((employeeInfo) => {
    return createEmployeeRecord(employeeInfo)
  })
}

// Employee's check in time provided date
let createTimeInEvent = (employeeRecord, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  })
  return employeeRecord
}

// Employee's check out time provided date
let createTimeOutEvent = (employeeRecord, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  })
  return employeeRecord
}

// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
let hoursWorkedOnDate = (employeeRecord, dateOfTheForm) => {
  let clockIn = employeeRecord.timeInEvents.find(
    (e) => e.date == dateOfTheForm
  ).hour
  let clockOut = employeeRecord.timeOutEvents.find(
    (e) => e.date == dateOfTheForm
  ).hour
  return (clockOut - clockIn) / 100
}

// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
let wagesEarnedOnDate = (employeeRecord, dateOfTheForm) => {
  const payPerHour = parseInt(employeeRecord.payPerHour)
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateOfTheForm)
  return payPerHour * hoursWorked
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record
let allWagesFor = (employeeRecord) => {
  let employeeWages = []
  let datesWorked = employeeRecord.timeInEvents.map((e) => e.date)
  for (let date of datesWorked) {
    employeeWages.push(wagesEarnedOnDate(employeeRecord, date))
  }
  return employeeWages.reduce((total, wage) => total + wage)
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record
let calculatePayroll = (AllEmployeeRecords) => {
  return AllEmployeeRecords.reduce((previoutAmount, employee) => {
    return previoutAmount + allWagesFor(employee)
  }, 0)
}
