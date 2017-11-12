all:
	@mkdir src/components/$(component)
	@touch src/components/$(component)/$(component).js
	@echo "import React from 'react';" >> src/components/$(component)/$(component).js
	@echo "import './$(component).css';" >> src/components/$(component)/$(component).js
	@echo "" >> src/components/$(component)/$(component).js
	@echo "class $(component) extends React.Component{" >> src/components/$(component)/$(component).js
	@echo "	render(){" >> src/components/$(component)/$(component).js
	@echo "		return(" >> src/components/$(component)/$(component).js
	@echo "			<div className="$(component)">" >> src/components/$(component)/$(component).js
	@echo "			</div>" >> src/components/$(component)/$(component).js
	@echo "		)" >> src/components/$(component)/$(component).js
	@echo "	}" >> src/components/$(component)/$(component).js
	@echo "}" >> src/components/$(component)/$(component).js
	@echo "export default $(component)" >> src/components/$(component)/$(component).js
	@touch src/components/$(component)/$(component).css
	@echo ".$(component){" >> src/components/$(component)/$(component).css
	@echo "}" >> src/components/$(component)/$(component).css
	@echo "Built Component '$(component)' "
	@echo "Look into 'src/components/$(component)' "
