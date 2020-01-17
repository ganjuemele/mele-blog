// 把数字变成星期
let arr = [0,1,2,2,3,3,3,4,4,4,4,6];
let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let arr2 = arr.map(item => item = week[item]);
console.log(arr2);
// ['周日', '周一', '周二', '周二', '周三', '周三', '周三', '周四', '周四', '周四', '周四','周六']
// 请使用 arr.map 把 0 变成'周日'，把 1 变成'周一'，以此类推



// 找出所有大于 60 分的成绩
let scores = [95,91,59,55,42,82,72,85,67,66,55,91];
let scores2 = scores.filter(item => item>60);
console.log(scores2);
//  [95,91,82,72,85,67,66,91]



// 算出所有奇数之和
let scores3 = [95,91,59,55,42,82,72,85,67,66,55,91];
let sum = scores3.reduce((sum, n) => {
    if ( n%2 === 1 ) {
        return sum += n
    } else {
        return sum
    }
}, 0);

console.log(sum);
// 奇数之和：598