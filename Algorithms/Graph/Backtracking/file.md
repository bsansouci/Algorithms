Ok so here are some explanations on what's happening in here. <br><br>
The <b>round nodes</b> designate variables to which we're currently trying to assign a word. The <b>rounded rectangles</b> represent the domain of the parent node. From those rounded rectangles we branch out to <b>actual rectangles</b> which are words that we try. Once we try a word, we need to check what happens to the domains of the dependent variables. Fortunately for us, this information is also written in the normal rectangle.<br><br>
As we go down and down our domains gets smaller and smaller, to the point were one domain is just empty, meaning the current assignment is impossible and so we need to backtrack. <br><br>
One last thing to clarify, the fact that it takes some time to build the graph is totally artificial, and was purposely set up so that people could see what's happening. <br>
<br>
<span style="font-size: 15px">Sheet cheat:</span> <br>
<table style='font-size: 13px'>
<tr>
    <td>
        <b>Space</b>:
    </td>
    <td>
        &nbsp;&nbsp;toggle animation
    </td>
</tr>
<tr>
    <td>
        <b>Right arrow</b>:
    </td>
    <td>
        &nbsp;&nbsp;next frame
    </td>
</tr>
</table>
