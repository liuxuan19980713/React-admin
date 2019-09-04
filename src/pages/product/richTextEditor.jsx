import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    let html 
    if(this.props.detail){
      html=this.props.detail
    }else{
      html = '<p>Hey this <strong>editor</strong> rocks 😀</p>'
    }
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };
  getEditValue = ()=>{
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  render() {
   
    const { editorState } = this.state;
   
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border:'1px solid #000',minHeight:200,marginTop:20,padding:10}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
