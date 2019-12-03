<template>
	<v-container class="pa-2 pt-0" v-resize="resizeChart" fluid id="vRow">

		<v-card class="mx-auto  py-3" outlined tile style="border: none;">
			<p class="subtitle-1 text-center blue-grey--text darken-3 mb-0 d-flex justify-center align-center" style="font-weight: 700;">
				最近
				<v-menu transition="scroll-y-transition">
					<template v-slot:activator="{ on }">
						 <v-chip outlined label class="subtitle-1 blue-grey--text darken-3"  v-on="on">{{numArr[defaultNum]}}</v-chip>
					</template>
					<v-list-item-group v-model="defaultNum" color="green" mandatory >
						<v-list dense class="pa-0">
							<v-list-item v-ripple="{ class: 'green--text' }" v-for="n in numArr" link @click="getDateProfit(n)">
								<v-list-item-title class="text-center">{{n}}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-list-item-group>
				</v-menu>
				 
				日收益走势图
			</p>
			<div id="chart" style="width: 100%;height: 400px;"></div>
		</v-card>
		<v-row dense class="pt-4">
			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#279f7c">
							<v-img :src="Uimg"></v-img>
						</v-avatar>
						<span class="subtitle-1">USDT收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.USDT?profitList.USDT:0}}
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#26c6da">
							<v-img :src="Eimg" style="width: 28px;height: 24px;"></v-img>
						</v-avatar>

						<span class="subtitle-1">ETH收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.ETH?profitList.ETH:0}}
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" :sm="6" :md="4" :lg="4">
				<v-card outlined tile>
					<v-card-text class="py-1 d-flex justify-space-between align-center">
						<v-avatar size="30" color="#f8a039">
							<v-img :src="Bimg"></v-img>
						</v-avatar>
						<span class="subtitle-1">BTC收益</span>
					</v-card-text>
					<v-divider class="ma-0"></v-divider>
					<v-card-text class="display-1 text-right">
						{{profitList.BTC?profitList.BTC:0}}
					</v-card-text>
				</v-card>
			</v-col>

		</v-row>
		<common-ubox class="my-2"></common-ubox>

	</v-container>
</template>

<script>
	import {indexData} from '@/mixins/indexData.js'
	export default {
		mixins:[indexData]
	}
</script>
