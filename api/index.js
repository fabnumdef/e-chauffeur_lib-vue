<% if(options.mocked) { %>
  import mockAxios from '<%=options.pkg.name%>/api/mock';
<% } %>
<% Object.keys(options.api).forEach((key) => { %>
  import <%=key%> from '<%=options.pkg.name%>/api/<%=options.api[key]%>';
<% })%>

export default function (ctx, inject) {
  <% if(options.mocked) { %>
    mockAxios(ctx.$axios);
  <% } %>
  const api = {
    <% Object.keys(options.api).forEach((key) => { %>
      <%=key%>: <%=key%>.setAxios ? <%=key%>.setAxios(ctx.$axios) : <%=key%>(ctx.$axios),
    <% })%>
    query(key, ...params) {
    return new this[key](...params);
    }
  };
  ctx.$api = api;
  inject('api', api);
}
