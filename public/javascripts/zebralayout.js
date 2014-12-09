zebra.ready(function(){

    eval(zebra.Import("ui", "layout"));

    // build Zebra canvas component that adds new
    // Canvas DOM element into page with the given size
    var zCanvas = new zebra.ui.zCanvas(1300,600);
    var root    = zCanvas.root; // save reference to root UI component
    root.setBorder(new zebra.ui.Border("lightblue", 3 , 20));

    var floor = new zebra.ui.Panel(); // creates kitchen floor
    floor.setBounds(300,20, 950, 560);
    floor.setBackground("beige");    // set beige background
    floor.setBorder(new zebra.ui.Border("black", 3 , 20));
    root.add(floor);

    // function to create Table (with seats)
    var makeTable = function(x,y){

          var table = new zebra.ui.Panel();

          table.setSize(200, 100);
          table.setBackground("grey")
          table.setBorder(new zebra.ui.Border("white", 3 , 20));
          table.setLocation(x , y);

          floor.add(table);

          makeSeat(x + 30, y-30);
          makeSeat(x + 130, y-30);
          makeSeat(x + 30, y+100);
          makeSeat(x + 130, y+100);


    };

    // creates a seat
    var makeSeat = function(x,y){

          var seat = new zebra.ui.Panel();

          seat.setSize(30, 30);
          seat.setBackground("white")
          seat.setBorder(new zebra.ui.Border("blue", 3 , 20));
          seat.setLocation(x , y);

          floor.add(seat);

    };

    // creates 4 tables in kitchen
    makeTable(250, 100);
    makeTable(500, 100);
    makeTable(250, 300);
    makeTable(500, 300);






});

