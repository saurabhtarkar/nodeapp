var editor; // use a global for the submit and return data rendering in the examples

// $(document).ready(function() {

//     var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

    editor = new $.fn.dataTable.Editor({
        //ajax: '../php/datetime.php',
        table: '#example',
        idSrc: 'id',
        //template: '#customForm',
        fields: [{
                label: 'Task Name:',
                name: 'rule_name',
                // type:  'textarea'
            }, {
                label: 'Content',
                name: 'message_content',
                type: 'textarea'
                // def:       function () { return new Date(); },
                // format:    'MM-DD-YYYY h:mm A',
                // fieldInfo: 'US style m-d-y date input with 12 hour clock'
            }, {
                type: "select",
                label: "Status:",
                name: "status",
                options: ['New', 'In progress', 'Completed']

            }, {
                type: "select",
                label: "Priority:",
                name: "priority",
                options: ['High', 'Intermediate', 'Low']

            }, {
                label: 'Due time',
                name: 'trigger_date',
                type: 'datetime',
                def: function() {
                    return new Date();
                },
                format: 'MM-DD-YYYY h:mm A',
                fieldInfo: 'IST with 24 hour clock'
            },
            {
                type: "select",
                label: "Tag",
                name: "tag",
                options: ['Personal', 'Work', 'Shopping', 'Others']

            }
        ]
        // tittle: 'Newest'

    });

    // New record
    $('a.editor_create').on('click', function(e) {
        e.preventDefault();

        editor.create({
            title: 'Create new record',
            buttons: 'Add',
            // ajax: {
            //   url: 'http://localhost:8888/smsc_info',
            //   post: this.data
            // },

        });
        console.log("in the edirto");
    });


    var status = ['New', 'In progress', 'Completed'],
        prio = ['High', 'Intermediate', 'Low'],
        tag = ['Personal', 'Work', 'Shopping', 'Others'];

    var t = $('#example').DataTable({
        dom: 'Bfrtip',
        ajax: {
            url: 'http://localhost:8888/getTask/1',
            dataSrc: ''
        },
        columns: [{
                data: 'rule_name'
            },
            {
                data: 'message_content'
            },
            {
                "render": function(d, t, r) {
                    console.log(d, t, r.status);
                    status[0] = r.status;
                    var $select = $('<select name ="status" class="is_valid form-control"></select>', {
                        "id": r[0] + "start",
                        "value": r.status
                    });
                    $.each(status, function(k, v) {
                        var $option = $('<option ></option>', {
                            "text": v,
                            "value": v
                        });
                        if (d === v) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });
                    return $select.prop("outerHTML");
                }
            },
            {
                "render": function(d, t, r) {
                    console.log(d, t, r.priority);
                    prio[0] = r.priority;
                    var $select = $('<select name ="status" class="is_valid form-control"></select>', {
                        "id": r[0] + "start",
                        "value": r.priority
                    });
                    $.each(prio, function(k, v) {
                        var $option = $('<option ></option>', {
                            "text": v,
                            "value": v
                        });
                        if (d === v) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });
                    return $select.prop("outerHTML");
                }
            },
            {
                data: 'trigger_date'
            },
            {
                "render": function(d, t, r) {
                    console.log(d, t, r.tag);
                    tag[0] = r.tag;
                    var $select = $('<select name ="status" class="is_valid form-control"></select>', {
                        "id": r[0] + "start",
                        "value": r.tag
                    });
                    $.each(tag, function(k, v) {
                        var $option = $('<option ></option>', {
                            "text": v,
                            "value": v
                        });
                        if (d === v) {
                            $option.attr("selected", "selected")
                        }
                        $select.append($option);
                    });
                    return $select.prop("outerHTML");
                }
            },
        ],

        select: true,

        // buttons: [

        //     { extend: 'create', editor: editor },
        //     { extend: 'edit',   editor: editor },
        //     { extend: 'remove', editor: editor }

        // ],
        "createdRow": function(row, data, index) {
            if (data.id > 150000) {
                console.log(data.id);
                ajax_api("POST", "http://localhost:8888/newTask", data);
            }
        }

    });
    var selectedRowData;

    $('#example tbody').on('click', 'tr', function() {
        console.log(t.row(this).data());
        selectedRowData = t.row(this).data();
    });

    editor.on('edit', function(e, json, data) {
        ajax_api('post', "http://localhost:8888/updateTask", data);
    });

    editor.on('remove', function(e, json, data) {
        var data = (t.row(this).data()); //t.row( $(this).parents('tr')).data();
        console.log(data);
        console.log('New row added ' + data);
        ajax_api('post', "http://localhost:8888/deleteTask", selectedRowData);

    });

    function ajax_api(req_type, url, datatosend) {
        console.log("Ajax call:: ", url, datatosend);
        $.ajax({
            type: 'post',
            url: url,
            crossDomain: true,
            async: false,
            contentType: "application/json",

            data: JSON.stringify(datatosend),
            success: function(json) {
                console.log("Response for " + json);
                alert("Message Sent success:");
            },
            error: function(xhr) {
                // body...
                console.log("Error Log:: ");
                alert("Message Sending Error :: ");
            },
            complete: function(json) {
                alert("Message Triggering process completed::");
            }
        });
    }

    function ajax_apis(req_type, url, datatosend) {
        console.log("Ajax call:: ", url, datatosend);
        $.ajax({
            type: 'post',
            url: 'http://localhost:8888/deleteTask',
            crossDomain: true,
            async: false,
            contentType: "application/json",

            data: JSON.stringify(datatosend),
            success: function(json) {
                console.log("Response for " + json);
                alert("Message Sent success:");
            },
            error: function(xhr) {
                // body...
                console.log("Error Log:: ");
                alert("Message Sending Error :: ");
            },
            complete: function(json) {
                alert("Message Triggering process completed::");
            }
        });
    }
});