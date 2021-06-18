const reducer = (accumulator, currentValue) => accumulator + currentValue;
function getTotalNumber(_peopleList) {
  return _peopleList.map(person => person.count).reduce(reducer, 0);
}
var app = new Vue({
  el: '#app',
  data() {
    return {
      currentInched: null,
      inchedList: null,
      totalNumber: null,
      numberList: null,
      inputInchedName: null,
      isInchedDisable: false,
      inputName: null,
      isDisable: false,
      wholeJson: null
    }
  },
  methods: {
    addValue: function (_name) {

      const _personIndex = this.numberList.findIndex(person => person.name === _name);
      const _person = this.numberList.find(person => person.name === _name);
      _person.count += 1;

      this.numberList[_personIndex] = _person;
      this.totalNumber = getTotalNumber(this.numberList);
      fetch("https://a.nacapi.com/inchpplcount2/" + this.currentInched, {
        method: 'post',
        body: JSON.stringify({ 'people': this.numberList })
      })
        .then(response => response.json())
        .then((data) => {
          this.totalNumber = getTotalNumber(this.numberList);
          this.numberList = data.people;
        });

    }
    ,
    addInchedPerson: function (_inputName) {
      this.isInchedDisable = true
      if (this.inchedList != null && _inputName != null && this.inchedList.find(person => person === _inputName) == null) {

        this.wholeJson[_inputName] = { 'people': [] }
        fetch("https://a.nacapi.com/inchpplcount2/", {
          method: 'post',
          body: JSON.stringify(this.wholeJson)
        })
          .then(response => response.json())
          .then((data) => {
            const _inchedList = Object.keys(data);
            this.inchedList = _inchedList
            this.currentInched = _inputName;
            const peopleList = data.people;
            
            this.totalNumber = getTotalNumber(peopleList);
            
            this.numberList = peopleList;
          });
      }
      this.isInchedDisable = false
    },
    addPerson: function (_inputName) {
      this.isDisable = true
      if (this.numberList != null && _inputName != null && this.numberList.find(person => person.name === _inputName) == null) {


        this.numberList.push({ 'name': _inputName, 'count': 0 })
        fetch("https://a.nacapi.com/inchpplcount2/" + this.currentInched, {

          method: 'post',
          body: JSON.stringify({ 'people': this.numberList })

        })
          .then(response => response.json())
          .then((data) => {
            this.currentInched = _inputName;
            const peopleList = data.people;
            
            this.totalNumber = getTotalNumber(peopleList);
            
            this.numberList = peopleList;
          });
      }
      this.isDisable = false
    }
    ,
    switchCurrentInched: function (_inchedName) {

      fetch("https://a.nacapi.com/inchpplcount2/" + _inchedName)
        .then(response => response.json())
        .then((data) => {
          this.currentInched = _inchedName;
          const peopleList = data.people;
          
          this.totalNumber = getTotalNumber(peopleList);
          
          this.numberList = peopleList;
        });
    }




  },
  mounted() {
    fetch("https://a.nacapi.com/inchpplcount2/")
      .then(response => response.json())
      .then((data) => {
        this.inchedList = Object.keys(data);
        this.wholeJson = data
        var name = this.inchedList[0];
        this.currentInched = name;
        const peopleList = data[name].people;
        this.totalNumber = getTotalNumber(peopleList);
        console.log(this.totalNumber);
        this.numberList = peopleList;


      })
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})




