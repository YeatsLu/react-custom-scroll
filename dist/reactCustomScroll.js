!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],t):"object"==typeof exports?exports.ReactCustomScroll=t(require("react"),require("react-dom")):e.ReactCustomScroll=t(e.react,e["react-dom"])}(this,function(e,t){return function(e){function t(r){if(o[r])return o[r].exports;var l=o[r]={exports:{},id:r,loaded:!1};return e[r].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(1)},function(e,t,o){"use strict";function r(e,t,o){return t=t||0===t?t:e,o=o||0===o?o:e,t>o?(console.error("min limit is greater than max limit"),e):t>e?t:e>o?o:e}var l=o(2),n=o(3);e.exports=l.createClass({displayName:"customScroll",propTypes:{allowOuterScroll:l.PropTypes.bool,heightRelativeToParent:l.PropTypes.string,onScroll:l.PropTypes.func,addScrolledClass:l.PropTypes.bool,freezePosition:l.PropTypes.bool,handleClass:l.PropTypes.string},getDefaultProps:function(){return{handleClass:"inner-handle"}},getInitialState:function(){return this.scrollbarYWidth=0,{scrollPos:0,onDrag:!1}},componentDidMount:function(){this.forceUpdate()},componentDidUpdate:function(e){var t=n.findDOMNode(this),o=t.getBoundingClientRect(),r=this.getScrolledElement(),l=r.scrollHeight;this.scrollbarYWidth=r.offsetWidth-r.clientWidth,this.visibleHeight=r.clientHeight,this.scrollRatio=l?this.visibleHeight/l:1,this.toggleScrollIfNeeded(l),this.position={top:o.top+window.pageYOffset,left:o.left+window.pageXOffset},this.freezePosition(e)},componentWillUnmount:function(){document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},freezePosition:function(e){var t=this.getScrolledElement(),o=this.refs.contentWrapper;this.props.freezePosition&&(o.scrollTop=this.state.scrollPos),e.freezePosition&&(t.scrollTop=this.state.scrollPos)},toggleScrollIfNeeded:function(e){var t=e-this.visibleHeight>1;this.hasScroll!==t&&(this.hasScroll=t,this.forceUpdate())},getScrollTop:function(){return this.getScrolledElement().scrollTop},updateScrollPosition:function(e){var t=this.getScrolledElement();t.scrollTop=e,this.setState({scrollPos:e})},onCustomScrollClick:function(e){if(!this.isClickOnScrollHandle(e)){var t=this.calculateNewScrollHandleTop(e),o=this.getScrollValueFromHandlePosition(t);this.updateScrollPosition(o)}},isClickOnScrollHandle:function(e){var t=n.findDOMNode(this.refs.scrollHandle);return e.target===t||e.target.parentElement===t},calculateNewScrollHandleTop:function(e){var t,o=e.pageY-this.position.top,r=this.getScrollHandleStyle().top,l=o>r+this.scrollHandleHeight;return t=l?r+Math.min(this.scrollHandleHeight,this.visibleHeight-this.scrollHandleHeight):r-Math.max(this.scrollHandleHeight,0)},getScrollValueFromHandlePosition:function(e){return e/this.scrollRatio},getScrollHandleStyle:function(){var e=this.state.scrollPos*this.scrollRatio;return this.scrollHandleHeight=this.visibleHeight*this.scrollRatio,{height:this.scrollHandleHeight,top:e}},adjustCustomScrollPosToContentPos:function(e){this.setState({scrollPos:e})},onScroll:function(e){this.props.freezePosition||(this.adjustCustomScrollPosToContentPos(e.currentTarget.scrollTop),this.props.onScroll&&this.props.onScroll(e))},getScrolledElement:function(){return this.refs.innerContainer},onHandleMouseDown:function(e){this.startDragHandlePos=this.getScrollHandleStyle().top,this.startDragMousePos=e.pageY,this.setState({onDrag:!0}),document.addEventListener("mousemove",this.onHandleDrag),document.addEventListener("mouseup",this.onHandleDragEnd)},onHandleDrag:function(e){e.preventDefault();var t=e.pageY-this.startDragMousePos,o=r(this.startDragHandlePos+t,0,this.visibleHeight-this.scrollHandleHeight),l=this.getScrollValueFromHandlePosition(o);this.updateScrollPosition(l)},onHandleDragEnd:function(e){this.setState({onDrag:!1}),e.preventDefault(),document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},blockOuterScroll:function(e){if(!this.props.allowOuterScroll){var t=e.currentTarget,o=e.currentTarget.scrollHeight,r=o-e.currentTarget.offsetHeight,l=e.deltaY%3?e.deltaY:10*e.deltaY;t.scrollTop+l<=0?(t.scrollTop=0,e.preventDefault()):t.scrollTop+l>=r&&(t.scrollTop=r,e.preventDefault()),e.stopPropagation()}},getInnerContainerClasses:function(){var e="inner-container";return this.state.scrollPos&&this.props.addScrolledClass&&(e+=" content-scrolled"),e},getScrollStyles:function(){var e=this.scrollbarYWidth||20,t={marginRight:-1*e,height:this.props.heightRelativeToParent?"100%":""},o={marginRight:this.scrollbarYWidth?0:e,height:this.props.heightRelativeToParent?"100%":"",overflowY:this.props.freezePosition?"hidden":"visible"};return{innerContainer:t,contentWrapper:o}},getOuterContainerStyle:function(){return{height:this.props.heightRelativeToParent?"100%":""}},render:function(){var e=this.getScrollStyles(),t={height:this.props.heightRelativeToParent};return l.createElement("div",{className:"custom-scroll "+(this.state.onDrag?"scroll-handle-dragged":""),style:t},l.createElement("div",{className:"outer-container",style:this.getOuterContainerStyle()},this.hasScroll?l.createElement("div",{className:"custom-scrollbar",onClick:this.onCustomScrollClick,key:"scrollbar"},l.createElement("div",{ref:"scrollHandle",className:"custom-scroll-handle",style:this.getScrollHandleStyle(),onMouseDown:this.onHandleMouseDown},l.createElement("div",{className:this.props.handleClass}))):null,l.createElement("div",{ref:"innerContainer",className:this.getInnerContainerClasses(),style:e.innerContainer,onScroll:this.onScroll,onWheel:this.blockOuterScroll},l.createElement("div",{className:"content-wrapper",ref:"contentWrapper",style:e.contentWrapper},this.props.children))))}})},function(t,o){t.exports=e},function(e,o){e.exports=t}])});