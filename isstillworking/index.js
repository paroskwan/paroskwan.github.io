const reducer = (accumulator, currentValue) => accumulator + currentValue;
var app = new Vue({
  el: '#app',
  data() {
    return {
      currentInched: null,
      inchedList: null,
      totalNumber: null,
      numberList: null,
      inputName: null,
      isDisable: false,

    }
  },
  methods: {
    addValue: function (_name) {

      const _personIndex = this.numberList.findIndex(person => person.name === _name);
      const _person = this.numberList.find(person => person.name === _name);
      _person.count += 1;

      this.numberList[_personIndex] = _person;
      this.totalNumber = this.numberList.map(person => person.count).reduce(reducer)

      fetch("https://a.nacapi.com/inchpplcount2/neo", {
        method: 'post',
        body: JSON.stringify({ 'people': this.numberList })
      })
        .then(response => response.json())
        .then((data) => {

          const peopleList = data.neo.people
          this.totalNumber = peopleList.map(person => person.count).reduce(reducer)
          this.numberList = peopleList;
        });

    }
    ,
    addPerson: function (_inputName) {
      this.isDisable = true
      if (this.numberList != null && _inputName != null && this.numberList.find(person => person.name === _inputName) == null) {
        this.numberList.push({ 'name': _inputName, 'count': 0 })
        fetch("https://a.nacapi.com/inchpplcount2/neo", {
          method: 'post',
          body: JSON.stringify({ 'people': this.numberList })
        })
          .then(response => response.json())
          .then((data) => {

            const peopleList = data.neo.people
            this.totalNumber = peopleList.map(person => person.count).reduce(reducer)
            this.numberList = peopleList;

            this.inputName = null
          });
      }
      this.isDisable = false
    }
    ,
    switchCurrentInched: function (_inchedName) {
      fetch("https://a.nacapi.com/inchpplcount2/" + _inchedName)
        .then(response => response.json())
        .then((data) => {

          const peopleList = data.people;
          console.log(peopleList);
          this.totalNumber = peopleList.map(person => person.count).reduce(reducer)
          console.log(this.totalNumber);
          this.numberList = peopleList;
        });
    }




  },
  mounted() {

    fetch("https://a.nacapi.com/inchpplcount2/")
    .then(response => response.json())
      .then((data) => {

        const _inchedList  = Object.keys(data);
        console.log(_inchedList);
        this.inchedList = _inchedList
      });

    fetch("https://a.nacapi.com/inchpplcount2/neo")
      .then(response => response.json())
      .then((data) => {

        const peopleList = data.people;
        console.log(peopleList);
        this.totalNumber = peopleList.map(person => person.count).reduce(reducer)
        console.log(this.totalNumber);
        this.numberList = peopleList;
      });

    // fetch("https://a.nacapi.com/inchpplcount/",{mode: 'cors'})
    // .then(response => response.json())
    // .then(this.info = response)
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})




