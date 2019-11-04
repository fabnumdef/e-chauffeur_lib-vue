<% Object.keys(options.api).forEach((key) => { %>
  import <%=key%> from '<%=options.pkg.name%>/api/<%=options.api[key]%>';
<% })%>

export default function (ctx, inject) {
  const api = {
    <% Object.keys(options.api).forEach((key) => { %>
      <%=key%>: <%=key%>(ctx.$axios),
    <% })%>
  };
  ctx.$api = api;
  inject('api', api);
}
