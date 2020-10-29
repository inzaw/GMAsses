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
