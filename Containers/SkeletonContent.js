import React, {Component} from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";



export default class Skeleton extends Component<Props>{

  render(){
    return(<SkeletonContent {...this.props}>
      {this.props.children}
    </SkeletonContent>)
  }
}
