import React, {PureComponent} from 'react';
import {
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
var SITE_URL = 'https://direct.lc.chat/12010923';

export default class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      isLoading: true,
      canGoBack: false,
      status_internet: true,
      modalVisibleFilter: false,
      urlNews: SITE_URL,
      url: SITE_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      messageFromWebView: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  handleBackPress = () => {
    if (this.state.canGoBack) {
      this.refWeb.goBack();
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  };

  getInitialState() {
    return {
      url: SITE_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      messageFromWebView: null,
    };
  }
  goBack() {
    // you can use this callback to control web view
    this.refs.webViewAndroidSample.goBack();
  }
  goForward() {
    this.refs.webViewAndroidSample.goForward();
  }
  reload() {
    this.refs.webViewAndroidSample.reload();
  }
  stopLoading() {
    // stops the current load
    this.refs.webViewAndroidSample.stopLoading();
  }
  postMessage(data) {
    // posts a message to web view
    this.refs.webViewAndroidSample.postMessage(data);
  }
  evaluateJavascript(data) {
    // evaluates javascript directly on the webview instance
    this.refs.webViewAndroidSample.evaluateJavascript(data);
  }
  injectJavaScript(script) {
    // executes JavaScript immediately in web view
    this.refs.webViewAndroidSample.injectJavaScript(script);
  }
  onShouldStartLoadWithRequest(event) {
    // currently only url & navigationState are returned in the event.

    if (event.url === 'https://www.mywebsiteexample.com/') {
      return true;
    } else {
      return false;
    }
  }

  onNavigationStateChange(event) {}

  onMessage(event) {
    this.setState({
      messageFromWebView: event.message,
    });
  }

  javascriptToInject() {
    return `
        $(document).ready(function() {
          $('a').click(function(event) {
            if ($(this).attr('href')) {
              var href = $(this).attr('href');
              window.webView.postMessage('Link tapped: ' + href);
            }
          })
        })
      `;
  }

  render() {
    return (
      <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
        <Header
          onBack={() => this.props.navigation.goBack(null)}
          title={'Live Chat CS'}
          shadow={true}
          right={false}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled={Platform.OS === 'android'}>
          <WebViewAndroid
            useWebKit={true}
            ref="webViewAndroidSample"
            startInLoadingState={true}
            javaScriptEnabled={true}
            geolocationEnabled={true}
            builtInZoomControls={false}
            injectedJavaScript={this.javascriptToInject()}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            onNavigationStateChange={this.onNavigationStateChange}
            onMessage={this.onMessage}
            url={SITE_URL} // or use the source(object) attribute...
            style={styles.container}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
