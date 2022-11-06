window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error')
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = '';
            return;
        }

        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = '';
        } catch (e) {
            textError.textContent = e;
        }
    })

    function getSalary() {
        output.textContent = salary.value;
    }

    const salary = document.querySelector('#salary')
    const output = document.querySelector('.salary-output')
    output.textContent = salary.value
    salary.addEventListener('input', getSalary)

});
// day 44 uc 3
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

//UC4
const createAndUpdateStorage = function (employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList = employeePayrollList.push(employeePayrollData)
    } else {
        employeePayrollList = [employeePayrollData] //need to ask in doubt session
    }
    alert(employeePayrollList.toString())
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData(); //creation of object
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e)
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop()
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop()
    employeePayrollData.department = getSelectedValues('[name=department]')
    employeePayrollData.salary = getInputValueById('#salary')
    employeePayrollData.note = getInputValueById('#notes')
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;

}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach((item) => {
        if (item.checked) {
            selItems.push(item.value)
        }
    })
    return selItems;
}

/*
1:query selector is a newever feature
2:The querysecector method can be used when selecting by element name,
nesting, or class name.
3: querySelector lets u find elements with rules that can,t be 
expressed with get elementById
*/

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/*
1:getElementById is better supported than querySelector in older versions
of the browsers.
2: The thing with getElementById is that it only allows to select an 
element by its id.
*/

const getInputElementValue = function (id) {
    let value = document.getElementById(id).value;

}

const resetForm= () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#note','');
    setValue('#day','1');
    setValue('#month','March');
    setValue('#year',2019);
  }
  
  const unsetSelectedValues = (propertValue) => {
    let allItems = document.querySelectorAll(propertValue);
    allItems.forEach(item => {
        item.checked = false;
    });
  }
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  }
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
    
  }