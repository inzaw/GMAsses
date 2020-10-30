/*
  Transformer function used on the response of get commits from the github api
  - it takes an array of objects where every object looks like this:
    ...
    sha:
    commit:{
      ...,
      author:{
      ...
      name:
    },
      message:
  }
  - it generates an array were each object looks like:
    {
    sha:
    author:
    message:
  }
*/

import {createTransformer} from './Transformer';

const Commit = {
  o:[
    ["sha","sha"],
  ],b:(original,modified)=>{
    modified.author = original.commit.author.name
    modified.message = original.commit.message
    return modified
  }
}

const Commits = {a:Commit}

export default createTransformer(Commits)
