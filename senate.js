const app = new Vue({
  el: '#senate',
  data: {
    apiKey: 'cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2',
    members: [],
    currentSort: 'last_name',
    currentSortDir: 'asc',
    currentSort2: 'last_name', 
    currentSortDir2: 'desc',
    currentSort3: 'last_name',
    currentSortDir3: 'asc',
    currentSort4: 'last_name', 
    currentSortDir4: 'desc',
    currentSort5: 'last_name',
    currentSortDir5: 'asc',
    filters: [],
    state: 'none',
    name: '',
    repCount: 0,
    demCount: 0,
    indCount: 0,
    repAvg: 0,
    demAvg: 0,
    indAvg: 0,
    attendance: [],
    attendance2: [],
    loyalty: [],
    loyalty2: [],


  },
  // async API request
  async mounted() {


    await fetch("https://api.propublica.org/congress/v1/116/senate/members.json", { headers: { "X-Api-Key": this.apiKey } })
      .then((response) => {
        return response.json()

      })
      .then(people => {
        people.results[0].members.forEach((item) => {
          if (item.in_office) {
            item.seniority = Number(item.seniority) // change string into number
            this.members.push(item)
          }
        });
      })
    console.log(this.members)

    this.partyVotes();
  },

  methods: {
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    sort2: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort2) {
        this.currentSortDir2 = this.currentSortDir2 === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort2 = s;
    },
    sort3: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort3) {
        this.currentSortDir3 = this.currentSortDir3 === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort3 = s;
    },
    sort4: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort4) {
        this.currentSortDir4 = this.currentSortDir4 === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort4 = s;
    },
    sort5: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort5) {
        this.currentSortDir5 = this.currentSortDir5 === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort5 = s;
    },

    filter: function (column, value) { //given code
      let contains = false;
      for (filterIdx in this.filters) {
        let filter = this.filters[filterIdx];
        if (filter.col == column && filter.val == value) {
          contains = true;
          this.filters.splice(filterIdx, 1);
          break;
        }
      }
      if (!contains) {
        this.filters.push({
          col: column,
          val: value
        });
      }
    },
    setState: function (event) { //given code
      this.state = event.target.value;
    },
    searchName: function (event) { //given code
      this.name = event.target.value.toLowerCase();
    },


    partyVotes: function () {
      let repTotal = 0;
      let demTotal = 0;
      let indTotal = 0;
      for (let i = 0; i < this.members.length; i++) {
        if (this.members[i].party === 'R') {
          this.repCount++;
          repTotal += this.members[i].votes_with_party_pct;
        }
        else if (this.members[i].party === 'D') {
          this.demCount++;
          demTotal += this.members[i].votes_with_party_pct;
        }
        else if (this.members[i].party === 'ID') {
          this.indCount++
          indTotal += this.members[i].votes_with_party_pct;
        }
      }
      this.repAvg = (repTotal / this.repCount).toFixed(2);
      this.demAvg = (demTotal / this.demCount).toFixed(2);
      this.indAvg = (indTotal / this.indCount).toFixed(2);
      // attendance slice
      this.attendance = this.attSort.slice(0, this.members.length * 0.1)
      this.attendance2 = this.attSort2.slice(0, this.members.length * 0.1)
     //loyalty slice
      this.loyalty = this.loySort.slice(0, this.members.length * 0.1)
      this.loyalty2 = this.loySort2.slice(0, this.members.length * 0.1)
      console.log(this.loyalty2)
      
    },
    votesWithParty: function(member) {
      return Math.round(member.total_votes * (member.votes_with_party_pct / 100));
    }
    
    
  },



  computed: {
    sortedMembers: function () {
      return this.members.filter((member) => { //given code
        if (this.state != "none" && member['state'] != this.state)
          return false;
        if (this.name != "" && !(member['first_name'].toLowerCase().includes(this.name) || member['last_name'].toLowerCase().includes(this.name)))
          return false;
        if (this.filters.length == 0)
          return true;
        for (filterIdx in this.filters) {
          let filter = this.filters[filterIdx];
          if (member[filter.col] == filter.val) {
            return true
          }
        }
        return false;
      }).sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    //not needed
    
    sortedMembers2: function () {
      return this.attendance2.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir2 === 'asc') modifier = -1;
        if (a[this.currentSort2] < b[this.currentSort2]) return -1 * modifier;
        if (a[this.currentSort2] > b[this.currentSort2]) return 1 * modifier;
        return 0;
      });
      
    },

    sortedMembers3: function () {
      return this.attendance.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir3 === 'asc') modifier = -1;
        if (a[this.currentSort3] < b[this.currentSort3]) return -1 * modifier;
        if (a[this.currentSort3] > b[this.currentSort3]) return 1 * modifier;
        return 0;
      });
    },
    sortedMembers4: function () {
      return this.loyalty.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir4 === 'asc') modifier = -1;
        if (a[this.currentSort4] < b[this.currentSort4]) return -1 * modifier;
        if (a[this.currentSort4] > b[this.currentSort4]) return 1 * modifier;
        return 0;
      });
    },
    sortedMembers5: function () {
      return this.loyalty2.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir5 === 'asc') modifier = -1;
        if (a[this.currentSort5] < b[this.currentSort5]) return -1 * modifier;
        if (a[this.currentSort5] > b[this.currentSort5]) return 1 * modifier;
        return 0;
      });
    },
 
  attSort() {
    return this.members.sort((a, b) => { return b.missed_votes - a.missed_votes; }); 
  },

  attSort2() {
    return this.members.sort((a ,b) => { return a.missed_votes - b.missed_votes; });
  },
   
  loySort() {
    return this.members.sort((a, b) => { return b.votes_with_party_pct - a.votes_with_party_pct});
  },

  loySort2() {
    return this.members.sort((a, b) => { return a.votes_with_party_pct - b.votes_with_party_pct});
  },


  }
});