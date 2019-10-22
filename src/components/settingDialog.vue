<template>
	<div>
		<v-dialog v-model="settingModal" persistent max-width="350">
			<v-card>
				<v-card-title class="subtitle-1 grey lighten-2">软件设置</v-card-title>
				<v-card-text class="my-3">
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-row justify="space-between">
							<v-col :lg="6" :sm="12" :md="6" :xs="12" cols="12">
								<span>超时撤单</span>
								<v-text-field type="number" v-model="setting.timeOut" min="0.1" step="1" suffix="分" color="green" outlined single-line
								 dense :rules="[rules.required, rules.one]"></v-text-field>
							</v-col>

							<v-col :lg="6" :sm="12" :md="6" :xs="12" cols="12">
								<span>超时更新参考</span>
								<v-text-field type="number" v-model="setting.refer" min="0.1" step="1" suffix="分" color="green" outlined single-line dense
								 :rules="[rules.required, rules.one]"></v-text-field>
							</v-col>

							<v-col :lg="6" :sm="12" :md="6" :xs="12" cols="12">
								<span>实时价格更新</span>
								<v-text-field type="number" v-model="list.constantly" min="0.5" step="0.5" suffix="秒" color="green" outlined
								 single-line dense :rules="[rules.required, rules.five]"></v-text-field>
							</v-col>

							<v-col :lg="6" :sm="12" :md="6" :xs="12" cols="12">
								<span>每轮暂停时间</span>
								<v-text-field type="number" min="0" v-model="setting.suspend" suffix="分" color="green" outlined single-line
								 dense :rules="[rules.required, rules.min]"></v-text-field>
							</v-col>

							<v-col :lg="6" :sm="12" :md="6" :xs="12" cols="12">
								<v-select class="ma-0 pt-0" color="green" :items="price" 
								v-model="setting.latest" item-text="value" item-value="id"
								 label="最新价格" single-line :rules="[rules.requireds]"></v-select>

							</v-col>

						</v-row>
					</v-form>


				</v-card-text>
				<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn color="green darken-1" text @click="closeMine(false)">取消</v-btn>
					<v-btn color="green darken-1" text @click="closeMine(true)">保存</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				valid: true,
				rules: {
					required: value => !!value || '必填.',
					requireds: value => value>=0 || '必填.',
					min: v => v >= 0 || '不能小于0',
					five: v => v >= 0.5 || '最小为0.5',
					one: v => v >= 0.1 || '最小为0.1',
				},

				setting: {},

				price: [{
						id: 0,
						idx:1,
						value: '买一卖一'
					},
					{
						id: 1,
						idx:2,
						value: '买二卖二'
					},
					{
						id: 2,
						idx:3,
						value: '买三卖三'
					}
				]
			}
		},
		props: {
			settingModal: {
				type: Boolean,
				default: false
			},
			list: {
				type: Object,
				deafult: () => ({})
			}
		},
		watch: {
			list:{
				handler(nV,oV){
					this.setting = nV;
				},
				deep:true,
				immediate: true
				
			}
			
		},
		methods: {
			closeMine(state) {
				if (state) {
					if (this.$refs.form.validate()) {
						this.$emit('closeSetting', {
							state: state,
							data: this.setting
						});
					}
				} else {
					this.$emit('closeSetting', {
						state: state
					});
				}

			}
		},
	}
</script>

<style>
</style>
