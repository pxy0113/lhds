<template>
	    <v-navigation-drawer
	      id="app-drawer"
	      v-model="inputValue"
	      app
	      dark 

		  temporary
	      persistent
	      width="260"
	    >
	      <v-list-item>
	        <v-list-item-avatar>
	          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
	        </v-list-item-avatar>
	
	        <v-list-item-content>
	          <v-list-item-title>John Leider</v-list-item-title>
	        </v-list-item-content>
	      </v-list-item>
	
	      <v-divider></v-divider>
	
	      <v-list dense>
	
	        <v-list-item
	          v-for="item in links"
	          link
	        >
	          <v-list-item-icon>
	            <Avatar :src="iconArr[item.icon]" />
	          </v-list-item-icon>
	
	          <v-list-item-content>
	            <v-list-item-title>{{ item.text }}</v-list-item-title>
	          </v-list-item-content>
	        </v-list-item>
	      </v-list>
	    </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

import img from '@/img/logo.png'
import indexBg from '@/img/index.svg'
import personBg from '@/img/person.svg'
import detailBg from '@/img/detail.svg'
import orderBg from '@/img/order.svg'
import ruleBg from '@/img/rule.svg'
import createBg from '@/img/create.svg'
export default {
  data: () => ({
    logo: img,
    barImg:img,
	iconArr:[indexBg,personBg,detailBg,orderBg,ruleBg,createBg],
    links: [
      {
        to: '/dashboard',
        icon: 0,
        text: '首页'
      },
      {
        to: '/user',
        icon: 1,
        text: '个人中心'
      },
      {
        to: '/table-list',
        icon: 2,
        text: '详细数据'
      },
      {
        to: '/order-list',
        icon: 3,
        text: '下单数据'
      },
      {
        to: '/rule',
        icon: 4,
        text: '规则策略'
      },
	  {
		to: '/dem',
		icon: 5,
		text:'托管数据'
	  }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.showBar
      },
      set (val) {
        this.$store.state.showBar = val;
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    // onResponsiveInverted () {
    //   if (window.innerWidth < 991) {
    //     this.responsive = true
    //   } else {
    //     this.responsive = false
    //   }
    // }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
