<template>
      <v-content :class="[$store.state.currentType=='Mobile' ? '' : 'mx-4 my-2']">
        
		<v-card outlined :class="[$store.state.currentType=='Mobile' ? 'xy-none-border' : '']" id="vRow">
			<v-fade-transition mode="out-in">
			  <router-view />
			</v-fade-transition>

		</v-card>
		
		<v-fab-transition>
		
			<Avatar :src="upIcon" v-if="show" class="xy-suspend elevation-4" @click.stop.native="$vuetify.goTo(target, options)">
			</Avatar>
		</v-fab-transition>
		
      </v-content>
</template>

<script>
import upSvg from '@/img/up.svg'
export default{
	data() {
		return {
			upIcon:upSvg,
			
			target: '#vRow',
			
			show:true,
			
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},
		}
	},
}
</script>

<style>

</style>
