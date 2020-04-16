// json接口
const treeData = [{
    "text": "",
    "nodes": [{
        "text": "",
        "nodes": [
            {
                "text": ""
            }
        ]
    }]
}];
// 标志位，用于限定按钮值能响应一次
let cnt = 0;

/*
 * 该函数用于将对应的div + 动态id值插入到HTML中的大div中
 */
function add_div(treeId) {
    const e = document.getElementById("tree");
    const div = document.createElement("div");
    div.id = treeId;
    div.innerHTML = e.innerHTML;
    document.getElementById("tree").appendChild(div);
}

/*
 * 该函数用于分割字符串并返回树形结构到HTML页面中
 */
function getData() {
    // 访问页面后只能点击一次，若想再次使用需刷新页面
    cnt++;
    if (cnt > 1) return;
    const texts = document.getElementById("val").value.trim();
    // 按空白行分割不同的树
    const tree = texts.split('\n\n');

    for (let i = 0; i < tree.length; i++)
    {
        // 空白行直接跳过
        if (tree[i] === "") continue;
        // 第i棵树
        const row = tree[i].trim().split('\n');
        /*
         * 按 "导师："，"级博士生："，"级硕士生："，
         * "级本科生："和"、" 分割字符串
         */

        // 导师
        const teacher = row[0].split("导师：");
        // 学生
        const len = row.length;
        const nodes = [];
        for (let j = 1; j < len; j++)
        {
            // 按前后分割
            const information = row[j].split("：");
            // 用顿号分割名字
            const stuName = information[1].split("、");
            const nameList = [];
            for (let k = 0; k < stuName.length; k++)
            {
                const name = stuName[k];
                // 学生名字数组
                nameList.push({ "text" : name });
            }
            // 学年学历 + 学生数组
            nodes.push(
                {
                    "text" : information[0],
                    "nodes" : nameList
                }
            );
        }
        // 设置Json值
        treeData[0]["text"] = teacher[1];
        treeData[0]["nodes"] = nodes;

        // 按照第i颗树动态生成div
        const treeId = "tree_" + i;
        add_div(treeId);

        // 将树形结构放入相应的div中
        $("#" + treeId).treeview({
            color: "#428bca",
            expandIcon: 'glyphicon glyphicon-hand-right',
            collapseIcon: 'glyphicon glyphicon-hand-down',
            emptyIcon: 'glyphicon glyphicon-user',
            showBorder: false,
            data: treeData
        });
    }
}
