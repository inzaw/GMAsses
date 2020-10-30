import React, {Component} from 'react';
import {View,Text,FlatList,StyleSheet,ActivityIndicator,RefreshControl} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {ErrorPage, PageHeader} from '../../Components'
import SkeletonContent from '../SkeletonContent'
import {Color,LightColor} from "../../res/Colors"
import CommitsTransformer from '../../Server/Transformer/CommitsTransformer'
import {request} from '@octokit/request'
import {HomeStr} from '../../res/Strings'
import Toast, {DURATION} from 'react-native-easy-toast'

/* PageStates defines the different possible options for a page:
  - Error: when a page fails to fetch its information, an error page should appear to let the user know there is an error
  and gives him the option to try again
  - Available: when a page did not fail yet, it is considered to be available, it could be still fetching the information from an api or successfully fetched them
*/
const PageStates = {
  AVAILABLE: 'AVAILABLE',
  ERROR: 'ERROR'
}

/* This class fetches the different commits done by a public repository (owned by Zeinab Awada, username:inzaw)
  - Every commit tile will include the message title, the author name and the hash of this commit
*/
export default class Homepage extends Component<Props>{

  componentDidMount(){
    this.getCommits()
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

/* When the user drags down the screen, a refresh control object shows whose function is below
  - this function updates the commits, if the function fails the old commits will stay visible
  - when api call fails, a red toast will appear at the top of the app
*/
  onRefresh=()=>{
     this.setState({ refreshing: true }, async () => {
       try{
         commits = await request('GET /repos/inzaw/GMAsses/commits')
         transformedCommits = CommitsTransformer.backward(commits.data)
         this.setState({loading: false, commits: transformedCommits, refreshing: false})
       }
       catch (e){
         this.setState({ refreshing: false},()=>{
            this.refs.toast.show(HomeStr.RefreshError,850);
         });
       }})
     }

   async getCommits(){
     try {
       commits = await request('GET /repos/inzaw/GMAsses/commits')
       transformedCommits = CommitsTransformer.backward(commits.data)
       this.setState({loading: false, commits: transformedCommits})
     }
     catch(error){
       this.setState({pageState: PageStates.ERROR, loading: false})
     }
   }

  render(){
    return(<>
      <PageHeader/>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30}}>
      <Toast ref="toast" style={{borderRadius: 0,backgroundColor: Color.red,width: '100%',minHeight:35,flexWrap: 'wrap'}}
        positionValue={0}
        position={'top'}
        textStyle={{color:Color.white,fontSize: 13,textAlign: 'center'}}
      />
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
            {obj.item.author !=null && <>
              <Text style={{color: Color.black, fontSize: 14, fontFamily: 'SF Pro Display Bold'}}>{obj.item.message.split('\n')[0]}</Text>
              <Text style={{color: Color.black, fontSize: 12, fontFamily: 'SF Pro Display Light', marginLeft: 5}}><Text style={{color:Color.primary}}>{obj.item.author}</Text> {HomeStr.CommittedMessage} {obj.item.sha} </Text>
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
     contentContainerStyle={{paddingTop: 25}}
     keyExtractor={this.keyExtractor}
     refreshControl={
       <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} colors={[Color.primary]} enabled={this.state.pageState===PageStates.AVAILABLE}/>
     }
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
