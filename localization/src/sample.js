import  React  from  'react';
import { DefaultButton, PrimaryButton } from  'office-ui-fabric-react/lib/Button';
import  l  from  '@documentica/localization';

export  default  class  ButtonTest  extends  React.Component{
	state={
		okCount:0,
		cancelCount:0
	};
	render() {
		return <div>
			<PrimaryButton  onClick={()=> this.setState({okCount:this.state.okCount+1},console.log(l`Ok button clicked ${this.state.okCount}`))}>
				{l`OK`}  
			</PrimaryButton>
			<DefaultButton  onClick={this.setState({cancelCount:this.state.cancelCount+1},console.log(l`Cancel button clicked ${this.state.okCount}`))}>
				{l`Cancel`}
			</DefaultButton>
		</div>;
	}
}