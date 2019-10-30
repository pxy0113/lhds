<template>
      <v-content :class="[$store.state.currentType=='Mobile' ? '' : 'mx-4 my-2']">
        
		<v-card outlined :class="[$store.state.currentType=='Mobile' ? 'xy-none-border' : '']">
			<v-fade-transition mode="out-in">
			  <router-view />
			</v-fade-transition>
		</v-card>
		
<!-- 		<div style="height: 100%;">
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div> -->
      </v-content>
</template>

<script>

</script>

<style>

</style>
