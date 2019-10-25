<template>
<!-- 	<v-card class="ma-0 d-flex justify-space-between align-center" style="min-height: 70px;z-index: 7;">
		<div class="pink--text font-weight-light green pl-200" >
		    <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
		        <v-icon>mdi-view-list</v-icon>
		    </v-btn>
		    {{ title }}
		</div>
		
		<v-flex align-center layout py-2>
		    <router-link v-ripple class="toolbar-items" to="/">
				<Avatar :src="indexB" size="small"></Avatar>
		        
		    </router-link>
					  
		    <router-link v-ripple class="toolbar-items" to="/user">
				<Avatar :src="personB" size="small"></Avatar>
		    </router-link>
		</v-flex>
	</v-card> -->
	
     <v-toolbar dense :min-height="70" style="position: fixed;top: 0;width: 100vw;z-index: 2;">
       <v-toolbar-title class=" font-weight-bold " style="color: #2c2c2c;">

		  <v-icon color="#2c2c2c" v-if="responsive" @click.stop="onClickBtn">mdi-view-list</v-icon>
          {{ responsive?title:''}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

                  <v-spacer />
      <v-toolbar-items>
          <v-flex align-center layout py-2>
			<span v-ripple class="toolbar-items" to="/user" @click="toRouter('/')">
			  <Avatar :src="indexB" size="small"></Avatar>
			  
			</span>
			  
			<span v-ripple class="toolbar-items" to="/user" @click="toRouter('/user')">

			  <Avatar :src="personB" size="small"></Avatar>
			</span>

          </v-flex>
      </v-toolbar-items>
    </v-toolbar>
  
</template>

<script>
	import indexBg from '@/img/home-outline.svg'
	import personBg from '@/img/person-outline.svg'
    import {
        mapMutations
    } from 'vuex'

    export default {
        data: () => ({
			personB:personBg,
			
			indexB:indexBg,
			
            notifications: [
                'Mike, John responded to your email',
                'You have 5 new tasks',
                'You are now a friend with Andrew',
                'Another Notification',
                'Another One'
            ],
            title: null,
            responsive: false,
            responsiveInput: false
        }),

        watch: {
            '$route'(val) {
                this.title = val.name
            }
        },

        mounted() {
            this.onResponsiveInverted()
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },

        methods: {
			toRouter(name){//路由
				if(this.$route.path!==name){
					this.$router.push({ path:name});
				}
				
			},
			
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
            onClickBtn() {
                this.setDrawer(!this.$store.state.app.drawer)
            },

            onResponsiveInverted() {
                if (window.innerWidth < 991) {
                    this.responsive = true
                    this.responsiveInput = false
                } else {
                    this.responsive = false
                    this.responsiveInput = true
                }
            }
        }
    }
</script>

<style>
    #core-toolbar a {
        text-decoration: none;
    }
</style>
