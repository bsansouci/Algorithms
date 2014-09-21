"use strict";

$(function() {
  function hillClimbing(domains, tasks, assignment) {
    // If there are no more tasks (so no more assignment to do)
    // then we're done, and we can return the current assignment
    if(tasks.length === 0) {
      return assignment;
    }

    // Get the current task (which is just a string representing a variable)
    var currentTask = tasks.pop();

    // ADDING A TASK NODE
    Graph.addNewTask(currentTask);

    // Get the current domain of that selected variable
    // This is just a list of possible words that this variable could be assigned
    // to
    var currentDomain = domains[currentTask];

    // ADDING A DOMAIN NODE
    Graph.addTaskDomain(currentDomain);


    // Get the current dependencies depending on the given variable
    var dependencies = getDependcies(currentTask);

    // log("DEPENDENCIES " + dependencies);
    // log("DOMAINS ", domains);
    // Wil contain all the words in descending order (from worst choice to best
    // choice) so we can dod allWords.pop()
    var allWords = [];

    // We loop through the *currentDomain*, which is just the list of possible
    // words
    for (var i = 0; i < currentDomain.length; i++) {
      // Get the current word of the domain, that's just so that it's easier to
      // reason about
      var currentWord = currentDomain[i];


      // This is going to be used when we find an empty domain, it will be used
      // to skip a word when it results in a conflict
      var skip = false;

      var newDomains = copy(domains);
      // We loop through the dependencies to apply the constraints on them
      for (var j = 0; j < dependencies.length; j++) {
        // *constraint* is a function that is going to be used to remove certain
        // possibilities from the domain of each dependent variables
        var constraint = getConstraint(currentWord, currentTask, dependencies[j]);
        var cur = domains[dependencies[j]].filter(constraint);
        // log("CUR: " + cur + "\nDEP: " + domains[dependencies[j]] + "\nCONSTRAINTS FROM " + currentTask + " ON " + dependencies[j] + "\nWORD: " + currentWord);
        if(cur.length === 0) {
          skip = true;
          break;
        }
        newDomains[dependencies[j]] = cur;
      }
      // log(newDomains)
      // If skip is true then there is a domain that is null because of currentWord
      // so we skip it, we don't want any conflicts
      if(skip) {
        continue;
      }

      // Add a new domain to the currentWord (so make a branch under the
      // currentTask)
      Graph.addNewDomain(newDomains, currentWord, dependencies);

      var change = getDifference(domains, newDomains);
      var found = false;
      for (var k = 0; k < allWords.length; k++) {
        if(allWords[k].change < change) {
          // We push the currentWord at the position k
          allWords.splice(k, 0, {
            change: change,
            word: currentWord,
            domains: newDomains});
          found = true;
          break;
        }
      }

      // If we didn't find a smaller change, that means the current one is the
      // best, so we push it at the end
      if(!found) {
        allWords.push({
          change: change,
          word: currentWord,
          domains: newDomains
        });
      }
    }

    // console.log("PRINTING SOME STUFF ", allWords);
    var newAssignment = null;
    while(allWords.length > 0) {
      var curBestAssignment = copy(assignment);
      var cur = allWords.pop();
      var curBestDomain = cur.domains;
      // log("LEAST CONSTRAINING WORD <span style='color:red'>" + cur.word + "</span> WITH " + cur.change);

      // Highlight the current branch being evaluated
      Graph.setCurrentWord(cur, dependencies);

      curBestAssignment[currentTask] = cur.word;

      var newAssignment = hillClimbing(curBestDomain, tasks, curBestAssignment);
      if(newAssignment != null) {
        return newAssignment;
      }
    }
    tasks.push(currentTask);

    Graph.backtrack();
    return null;

    function getDependcies(task) {
      var firstLetter = task.split('')[0];
      var array;
      if(firstLetter === "A") {
        array = ["D1", "D2", "D3"];
      } else {
        array = ["A1", "A2", "A3"];
      }

      return array.filter(function(val){
        for(var prop in assignment) {
          if(prop === val && assignment[prop].length > 0) {
            return false;
          }
        }
        return true;
      });
    }

    function getConstraint(curWord, curTask, dep) {
      var indexInDomain = parseInt(curTask.split('')[1]) - 1;
      var addedLetterConstraint = curWord.charAt(parseInt(dep.split('')[1]) - 1);
      return function(word) {
        var letter = word.split('')[indexInDomain];

        return addedLetterConstraint === letter;
      };
    }

    function getDifference(before, after) {
      var size = 0;
      var acc = [];
      for(var props in before) {
        if(before.hasOwnProperty(props)) {
          acc.push(before[props].length);
          size++;
        }
      }

      var i = 0;
      for(var props in after) {
        if(after.hasOwnProperty(props)) {
          acc[i] = after[props].length / acc[i];
          i++;
        }
      }

      return acc.reduce(function(acc, val, index){
        return acc + val;
      }, 0) / size;
    }

    function copy(obj) {
      var o = {};
      for(var props in obj) {
        if(obj.hasOwnProperty(props)) {
          o[props] = obj[props];
        }
      }
      return o;
    }
  }

  // Those are the tasks to do, from back to front (so we can pop() to get the
  // next task)
  var tasks = ['D3', 'A3', 'D2', 'A2', 'D1', 'A1'];

  var domains = {
    A1: ["are", "art", "bat", "bee", "boa", "ear", "eel", "eft", "far", "fat", "lee", "oaf", "rat", "tar"],
    A2: ["add", "ado", "age", "ago", "aid", "air", "and", "any", "ape", "are", "awe", "aye", "ear", "oaf"],
    A3: ["add", "ado", "ago", "and", "any", "arc", "are", "ark", "arm", "art", "aye", "ear", "eel", "eft", "far", "fat", "lee", "oaf", "rat", "tar"],
    D1: ["are", "art", "bat", "bee", "boa", "ear", "eel", "eft", "far", "fat", "lee", "oaf", "rat", "tar"],
    D2: ["add", "ado", "age", "ago", "aid", "air", "and", "any", "ape", "are", "awe", "aye", "ear", "oaf"],
    D3: ["add", "ado", "ago", "and", "any", "arc", "are", "ark", "arm", "art", "aye", "ear", "eel", "eft", "far", "fat", "lee", "oaf", "rat", "tar"]
  }

  var assignments = {
    A1: "",
    A2: "",
    A3: "",
    D1: "",
    D2: "",
    D3: ""
  }

  function log(text) {
    // var main = $("#main");
    // var str = main.html();
    // main.html(str + "<br>" + text);
    console.log(text);
  }


  var Graph = (function() {
    var graph = {};
    var htmlGraph = $("#text");
    // var allTasks = [];
    // var allDoamains = [];
    var currentTask = null;
    var currentDomain = null;

    var communication = {
      prevParent: []
    };

    graph.addNewTask = function(task) {
      var str = "<span style='color: red;'> " + task + "</span><br>";
      AnimationManager.addFrame(function(str) {
        console.log(this)
        var n = d3Graph.addDataNode({
          type: "task",
          text: str
        });
        d3Graph.changeCurrentParent(n, true);
      }.bind(communication), str);
      currentTask = task;
      // allTasks.push(task);
    };

    graph.addTaskDomain = function(domain) {
      var str = "Possibilities for <span style='color: red;'>" + currentTask + "</span>:<ul>";
      for (var i = 0; i < domain.length; i++) {
        str += "<li>" + domain[i] + (i === domain.length - 1 ? "" : ",") + "&nbsp;</li>";
      };
      str += "</ul>";
      AnimationManager.addFrame(function(str) {
        // console.log(this.prevParent)
        var n = d3Graph.addDataNode({
          type: "possibilities",
          text: str
        });
        communication.prevParent.push(n);

        d3Graph.changeCurrentParent(n, true);
      }.bind(communication), str);
      currentDomain = domain;
    };

    graph.addNewDomain = function(newDomains, currentWord, dependencies) {
      var str = "Word <span style='color: red;'> " + currentWord + "</span><br> gives the following contraints<br><br>";
      for(var prop in newDomains) {
        var flag = dependencies.reduce(function(acc, val, index){
          return acc || val === prop;
        }, false);
        if(flag) {
          str += "For " + prop + "<br><ul>";
          for (var i = 0; i < newDomains[prop].length; i++) {
            str += "<li> " + newDomains[prop][i] + (i === newDomains[prop].length - 1 ? "" : ",") + "&nbsp;</li>";
          };
          str += "</ul><br>";
        }
      }
      // AnimationManager.addFrame(function(str) {
      //   d3Graph.addDataNode({
      //     type: "word",
      //     text: str
      //   });
      // }.bind(communication), str);
    };

    graph.setCurrentWord = function(cur, dependencies) {
      var str = "Currently evaluating <span style='color: red;'>" + cur.word + "</span> with change value of " + Math.round(cur.change * 10000)/10000 + "<br><br>";
      str += "Constrained domains: <br>"
      for(var prop in cur.domains) {
        var flag = dependencies.reduce(function(acc, val, index){
          return acc || val === prop;
        }, false);
        if(flag) {
          str += "For " + prop + ":&nbsp;<ul>";
          for (var i = 0; i < cur.domains[prop].length; i++) {
            str += "<li> " + cur.domains[prop][i] + (i === cur.domains[prop].length - 1 ? "" : ",") + "&nbsp;</li>";
          };
          str += "</ul><br>";
        }
      }
      AnimationManager.addFrame(function(str) {
        d3Graph.changeCurrentParent(communication.prevParent[communication.prevParent.length - 1]);

        var n = d3Graph.addDataNode({
            type: "word",
            text: str
          });
        d3Graph.changeCurrentParent(n);
      }.bind(communication), str);
    };

    graph.backtrack = function() {
      AnimationManager.addFrame(function() {
        d3Graph.changeCurrentParent(communication.prevParent.pop());
        d3Graph.addDataNode({
          type: "possibilities",
          text: "Hitting a wall, backtracking..."
        });
      }.bind(communication));
    };

    graph.showResults = function(obj) {
      var str = "And the results are: <br> <table border='1' style='width: "+ window.innerWidth / 3 +"; font-size: 20px; text-align: center'>";

      for(var prop in obj) {
        var firstLetter = prop.split('')[0];
        if(firstLetter === "A") {
          str += "<tr>";
          var letters = obj[prop].split('');
          for (var i = 0; i < letters.length; i++) {
            str += "<td>" + letters[i] + "</td>";
          }
          str += "</tr>";
        }
      }
      str += "</table>";
      AnimationManager.addFrame(function(str) {
        $("#results").html(str);
      }.bind(communication), str)
    };

    return graph;
  })();


  var d3Graph = (function(){
    var width = window.innerWidth * 9/10,
        height = window.innerHeight * 9/10;
    var m = [20, 240, 20, 240];

    var tree = d3.layout.tree()
        .size([width - 20, height - 20]);

    var root = {},
        nodes = tree(root);

    root.parent = root;
    root.px = root.x;
    root.py = root.y;

    var diagonal = d3.svg.diagonal();
    // var zoom = d3.behavior.zoom().translate([100,50]).scale(.2);

    var svg = d3.select("#graph")
      .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + [0, 0] + ")" + " scale(" + [1, 1] + ")");
    d3.select("#graph").call(d3.behavior.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", zoom));

    var tasks = svg.selectAll(".tasks"),
        words = svg.selectAll(".words"),
        possibilities = svg.selectAll(".possibilities"),
        link = svg.selectAll(".link");

    var curParent = root;

    function update() {
      // Recompute the size, if it changed (used for dynamic graphs)
      tree.size([width - 20, height - 20]);
      d3.select("#graph svg")
        .attr("width", width)
        .attr("height", height)

      // Recompute the layout and data join.
      tasks = tasks.data(tree.nodes(root).filter(onlyTasks), function(d) { return d.id; });
      words = words.data(tree.nodes(root).filter(onlyWords), function(d) { return d.id; });
      possibilities = possibilities.data(tree.nodes(root).filter(onlyPossibilities), function(d) { return d.id; });

      link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });

      var t = tasks.enter();
      var w = words.enter();
      var p = possibilities.enter();

      t.append("circle")
          .attr("class", "node tasks")
          .attr("r", 20)
          .style("stroke", "gray")
          .style("fill", "white")
          .attr("cx", function(d) { return d.parent.px; })
          .attr("cy", function(d) { return d.parent.py; });

      w.append("rect")
          .attr("class", "node words")
          .style("stroke", "gray")
          .style("fill", "white")
          .attr("width", 120)
          .attr("height", 180)
          .attr("x", function(d) { return d.parent.px; })
          .attr("y", function(d) { return d.parent.py; });

      p.append("rect")
          .attr("class", "node possibilities")
          .style("stroke", "gray")
          .style("fill", "white")
          .attr("width", 120)
          .attr("height", 80)
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("x", function(d) { return d.parent.px; })
          .attr("y", function(d) { return d.parent.py; });

      // Add entering links in the parent’s old position.
      link.enter().insert("path", ".node")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: d.source.px, y: d.source.py};
            return diagonal({source: o, target: o});
          });

      t.append("foreignObject")
        .attr("class", "taskText")
        .attr("width", 30)
        .attr("height", "100%")
        .attr("x", function(d) { return d.parent.px; })
        .attr("y", function(d) { return d.parent.py; })
      .append("xhtml:div")
        .html(function(d) {
          return d.text;
        })

      w.append("foreignObject")
        .attr("class", "wordText")
        .attr("width", 110)
        .attr("height", "100%")
        .attr("x", function(d) { return d.parent.px; })
        .attr("y", function(d) { return d.parent.py; })
      .append("xhtml:div")
        .html(function(d) {
          return d.text;
        })

      p.append("foreignObject")
        .attr("class", "possibilitiesText")
        .attr("width", 110)
        .attr("height", "100%")
        .attr("x", function(d) { return d.parent.px; })
        .attr("y", function(d) { return d.parent.py; })
      .append("xhtml:div")
        .html(function(d) {
          return d.text;
        })

      // Transition nodes and links to their new positions.
      var transition = svg.transition()
          .duration(500);

      transition.selectAll(".link")
          .attr("d", function(obj) {
            return diagonal(obj);
          })


      transition.selectAll(".tasks")
          .attr("cx", function(d) { return d.px = d.x; })
          .attr("cy", function(d) { return d.py = d.y - 15; });
      transition.selectAll(".words")
          .attr("x", function(d) { return d.px = d.x - 60; })
          .attr("y", function(d) { return d.py = d.y - 90; });
      transition.selectAll(".possibilities")
          .attr("x", function(d) { return d.px = d.x - 60; })
          .attr("y", function(d) { return d.py = d.y - 50; });


      transition.selectAll(".taskText")
          .attr("x", function(d) { return d.px = d.x - 10; })
          .attr("y", function(d) { return d.py = d.y - 24; });
      transition.selectAll(".wordText")
          .attr("x", function(d) { return d.px = d.x - 55; })
          .attr("y", function(d) { return d.py = d.y - 85; });
      transition.selectAll(".possibilitiesText")
          .attr("x", function(d) { return d.px = d.x - 55; })
          .attr("y", function(d) { return d.py = d.y - 45; });
    }

    function onlyTasks(node) {
      return node.type === "task";
    }
    function onlyWords(node) {
      return node.type === "word";
    }
    function onlyPossibilities(node) {
      return node.type === "possibilities";
    }
    function zoom() {
      var scale = d3.event.scale,
        translation = d3.event.translate,
        tbound = -height * scale,
        bbound = height * scale,
        lbound = (-width + m[1]) * scale,
        rbound = (width - m[3]) * scale;
      // limit translation to thresholds
      translation = [
        Math.max(Math.min(translation[0], rbound), lbound),
        Math.max(Math.min(translation[1], bbound), tbound)
      ];
      d3.select("svg g")
        .attr("transform", "translate(" + translation + ")" + " scale(" + scale + ")");
    }

    var graph = {};
    graph.addDataNode = function(data) {
      data.id = nodes.length;
      if (curParent.children) curParent.children.push(data); else curParent.children = [data];
      nodes.push(data);
      width += 20;
      update();
      return data;
    }
    graph.changeCurrentParent = function(node, goingDown) {
      if(!node) {
        node = nodes[nodes.length - 1];
      }

      curParent = node;

      if(goingDown) {
        height += 60;
      }
      update();
    };

    graph.getCurrentParent = function() {
      return curParent;
    };

    return graph;
  })();

  var AnimationManager = (function() {
    var anim = {};
    var frames = [];
    var frameRate = 500;
    var pause = true;

    anim.addFrame = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      frames.push({fn: fn, args: args});
      if(frames.length === 1 && !pause) {
        setTimeout(this.update.bind(this), frameRate);
      }
    };

    anim.update = function() {
      var obj = frames.shift();
      console.log(this)
      obj.fn.apply(this, obj.args);
      if(frames.length > 0 && !pause) {
        setTimeout(this.update.bind(this), frameRate);
      }
    };

    anim.pause = function() {
      pause = true;
      $("#warning").show();
    };

    anim.start = function() {
      pause = false;
      $("#warning").hide();
      setTimeout(this.update.bind(this), frameRate);
    };

    anim.toggle = function() {
      if(pause) {
        this.start();
      } else {
        this.pause();
      }
    };

    anim.nextStep = function() {
      if(frames.length > 0){
        var obj = frames.shift();
        obj.fn.apply(this, obj.args);
      }
    };

    window.addEventListener("keydown", function(evt) {
      if(evt.which === 32) {
        anim.toggle();
      }
      if(evt.which === 39) {
        anim.nextStep();
      }
    });

    return anim;
  })();

  var str = "";
  $.get("file.md", function(data) {
    // str += "Ok so here are some explanations about what's happening in here.";
    $("#text").html(data);
  });

  var results = hillClimbing(domains, tasks, assignments);
  Graph.showResults(results);
});
