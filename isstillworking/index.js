var app = new Vue({
    el: '#app',
    data () {
      return {
        totalNumber: null,
        numberList:null,
      }
    },
  methods: {
    addValue: function (_name) {
    
      const _personIndex = this.numberList.findIndex(person => person.name === _name);
      const _person = this.numberList.find(person => person.name === _name);
      _person.count += 1;
    
      this.numberList[_personIndex] = _person;

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
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
  },
    mounted () {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

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



  
  