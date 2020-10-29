import React, {Component} from 'react';
import {View,Text,FlatList,StyleSheet,ActivityIndicator,RefreshControl} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {ErrorPage, PageHeader} from '../../Components'
import SkeletonContent from '../SkeletonContent'
import {Color,LightColor} from "../../res/Colors"
import {request} from '@octokit/request'


const PageStates = {
  AVAILABLE: 'AVAILABLE',
  ERROR: 'ERROR'
}


export default class Homepage extends Component<Props>{

  componentDidMount(){
    this.getCommits()
  }

  async getCommits(){
    try {
      commits = await request('GET /repos/inzaw/GMAsses/commits')
      this.setState({loading:false,commits:commits.data})
    }
    catch(error){
      this.setState({pageState:PageStates.ERROR,loading:false})
    }
  }

  state = {
    pageState: PageStates.AVAILABLE,
    loading: true,
    commitsPlaceholder: [
      {
        sha:1
      },
      {
        sha:2
      },
      {
        sha:3
      },
      {
        sha:4
      },
    ],
  }


  render(){
    return(<>
      <PageHeader/>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30}}>
            <View style={{flex:1, width: "100%", height: "100%"}}>
              {
                {
                  [PageStates.ERROR]: this.renderErrorPage,
                  [PageStates.AVAILABLE]: this.renderPage,
                }[this.state.pageState]()
              }
            </View>
      </SafeAreaView>
        </>);
  }

  renderErrorPage=()=>{
        return <ErrorPage onTryAgainClicked={()=>this.setState({pageState: PageStates.AVAILABLE, loading: true},()=>this.getCommits())}/>
  }

  keyExtractor = (item) => item['sha'].toString();

  returnCommit = (obj) => {
   return  <View disabled={this.state.loading} style={{marginVertical: 5}}>
      <View style={styles.rowContainer}>
        <SkeletonContent
          key={obj.item.id}
          containerStyle={{flex: 1, alignItems: 'flex-start'}}
          isLoading={this.state.loading}
          layout={[
            { key: obj.item.id+1, width: 200, height: 10},
            { key: obj.item.id+2, width: 100, height: 5, marginTop: 10},
            { key: obj.item.id, width: 100, height: 5, marginTop: 10}
          ]}
          >
            {obj.item.commit !=null && <>
              <Text style={{color: Color.black, fontSize: 14, fontFamily: 'SF Pro Display Bold'}}>{obj.item.commit.message.split('\n')[0]}</Text>
              <Text style={{color: Color.black, fontSize: 12, fontFamily: 'SF Pro Display Light', marginLeft: 5}}><Text style={{color:Color.primary}}>{obj.item.commit.author.name}</Text> committed hash {obj.item.sha} </Text>
            </>}
          </SkeletonContent>
        </View>
        <View style={{borderColor: Color.grey, borderTopWidth: 0.6}}></View>
      </View>
   }

   renderPage=()=>{
     return <>
   <FlatList
     data={this.state.loading?this.state.commitsPlaceholder: this.state.commits}
     renderItem={this.returnCommit}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{paddingTop: 20}}
     keyExtractor={this.keyExtractor}
   />
</>
}


}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
