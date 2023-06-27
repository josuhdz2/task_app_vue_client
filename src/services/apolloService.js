import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost';
const apolloClient=new ApolloClient({
    uri:'http://127.0.0.1:3000/graph'
});
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});
export default apolloProvider;
