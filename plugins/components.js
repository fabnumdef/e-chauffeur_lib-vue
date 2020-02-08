import Vue from 'vue';

<% Object.keys(options.components).forEach((componentKey) => { %>
  import <%=componentKey%> from '<%=options.pkg.name%>/src/components/<%=options.components[componentKey]%>';
<% })%>

<% Object.keys(options.components).forEach((componentKey) => { %>
  Vue.component('<%=componentKey%>', <%=componentKey%>);
<% })%>

