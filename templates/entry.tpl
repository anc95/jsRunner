import _js_ from '<%=js%>'

<% if (excutor) { %>
    import excutor from '<%= excutor %>'
    excutor(_js_)
<% } %>

if (module.hot) {
    module.hot.accept()
}