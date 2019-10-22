module.exports = {
  presets: [
    '@vue/app'
  ],
  /*1.此处为了使用es新特性 也就是可选链 */
  plugins: [
		"@babel/plugin-proposal-optional-chaining"
	] 
}

/*const personFirstName = person?.details?.name?.firstName ?? 'stranger';

空位合并运算符用??来表示。它也很容易去解读。如果??左侧返回的内容是undefined，那么personFirstName会将??右侧的值赋值给它。*/
