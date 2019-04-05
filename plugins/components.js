import Vue from 'vue';

<% Object.keys(options.components).forEach((componentKey) => { %>
  import <%=componentKey%> from '<%=options.pkg.name%>/src/components/<%=options.components[componentKey]%>';
<% })%>

export default function ({ app, store }) {
  <% Object.keys(options.components).forEach((componentKey) => { %>
    Vue.component('<%=componentKey%>', <%=componentKey%>);
  <% })%>
}

