--数据库操作前的准备

-- 查询练习
	-- 查询所有字段
	-- select * from 表名;
	select * from students;

 


	-- 查询指定字段
	-- select 列1,列2,... from 表名;
		select id,name from students;

	
-- 使用 as 给字段起别名
	-- select 字段 as 名字.... from 表名;
	SELECT name as '名字' FROM students;


	-- select 表名.字段 .... from 表名;
	SELECT students.name,students.age FROM students;


	
	
	-- 可以通过 as 给表起别名
	-- select 别名.字段 .... from 表名 as 别名;
	SELECT s.name as '名字' FROM students as s;



	-- 消除重复行(查性别)
	-- distinct 字段 
	SELECT distinct gender FROM students;



	

-- 条件查询
	-- 比较运算符
		-- select .... from 表名 where .....
		-- >
		-- 查询年纪大于18岁的学生信息
		SELECT * FROM students WHERE age>18;


		-- <
		-- 查询年纪小于18岁的学生信息
		SELECT * FROM students WHERE age<18;
		
		

		-- >=
		-- <=
		-- 查询小于或者等于18岁的学生信息
		SELECT * FROM students WHERE age>=18;


		-- =
		-- 查询年龄为18岁的所有学生信息
		SELECT * FROM students WHERE age=18;



		-- != 或者 <>
		-- 查询年龄不为18岁的所有学生信息
		SELECT * FROM students WHERE age<>18;
		SELECT * FROM students WHERE age!=18;
		

	-- 逻辑运算符
		-- and  /  between .. and ..
		-- 18和28之间的所以学生信息
			SELECT * FROM students WHERE age>18 and age<28;
			
			SELECT * FROM students WHERE age BETWEEN 18 AND 28;


		-- 18岁以上的女性的学生信息
			SELECT * FROM students WHERE age>18 AND gender='女';


		-- or
		-- 18以上或者身高高过180(包含)以上的学生信息
			SELECT * FROM students WHERE age>18 or height>=180;

		

		-- not
		-- 不在 18岁以上的女性 这个范围内的信息
		select * from students where not (age>18 and gender='女');











	-- 模糊查询(where name like 要查询的数据)
		-- like 
		-- % 替换任意个
		-- _ 替换1个
		-- 查询姓名中 以 "小" 开始的名字的学生信息

		

		-- 查询姓名中 有 "小" 所有的名字的学生信息

		

		-- 查询有2个字的名字的学生信息

		


		-- 查询有3个字的名字的学生信息


		

		-- 查询至少有2个字的名字的学生信息

		


	-- 范围查询
		-- in (1, 3, 8)表示在一个非连续的范围内
		-- 查询 年龄为18或34的姓名的学生信息
	


		

		-- not in 不非连续的范围之内
		-- 年龄不是 18或34岁的学生信息



		
		-- between ... and ...表示在一个连续的范围内
		-- 查询 年龄在18到34之间的学生信息
	

		
		

		
		-- not between ... and ...表示不在一个连续的范围内
		-- 查询 年龄不在18到34之间的学生信息

		
		

	-- 空判断
		-- 判空is null
		-- 查询身高为空的学生信息
		
		


		-- 判非空is not null
		
		


-- 排序
	-- order by 字段
	-- asc
	-- asc从小到大排列，即升序
	-- desc
	-- desc从大到小排序，即降序
	-- 查询年龄在18到34岁之间的男性，按照年龄从小到大到排序

	

	


	-- 查询年龄在18到34岁之间的女性，身高从高到矮排序
	
	

	-- order by 多个字段
	-- 查询年龄在18到34岁之间的女性，身高从高到矮排序, 如果身高相同的情况下按照年龄从小到大排序
	


	
    -- 如果年龄也相同那么按照id从大到小排序
    	


	
	


-- 聚合函数
	-- 总数
	-- count
	-- 查询男性有多少人

	
	
	-- 最大值
	-- max
	-- 查询最大的年龄

	
	
	-- 查询女性的最高 身高

	


	-- 最小值
	-- min

	


	-- 求和
	-- sum
	-- 计算所有人的年龄总和


	
	
	-- 平均值
	-- avg
	-- 计算平均年龄
	
	


	-- 计算平均年龄 sum(age)/count(*)

	


	-- 四舍五入 round(123.23 , 1) 保留1位小数
	-- 计算所有人的平均年龄，保留2位小数

	


	-- 计算男性的平均身高 保留2位小数

	# 聚合函数计算的时候不会把null计算进去
	


-- 分组

	-- 分组的口诀
	-- select 分组的字段 from 表名 group by 分组字段;

	-- group by
	-- 按照性别分组,查询所有的性别




	# 每种   每类   
	-- 计算每种性别中的人数




	-- group_concat(...)
	-- 查询同种性别中的姓名group_concat(name)

	


	
	-- 查询每组性别的平均年龄

	


	-- having(注意having和group by 连用 having后通常也要跟 聚合函数)
	-- 查询平均年龄超过30岁的性别，以及姓名
	
	

	
	-- 查询每种性别中的人数多于2个的信息
	-- select gender, count(*) from students group by gender having count(*) > 2;

	


-- 分页
	-- limit start, count
	-- limit 放在最后面(注意)
	-- limit (要显示第几页-1) * 每页分多少个, 每页分多少个;

	-- 限制查询出来的数据个数
	-- 查询前5个数据


	-- 每页分2个，要显示第1页
	

	-- 每页分2个，要显示第2页
	
	
	-- 每页分2个，要显示第3页


	-- 每页分2个，要显示第4页

	

	-- 每页分2个，显示第6页的信息, 按照年龄从小到大排序
	
	

	
	
	 
-- select * from students where 
-- select 分组 from students group by 分组字段 having 条件查询
-- select * from 表a inner join 表b on 连接的条件

-- 连接查询
	-- inner join ... on
	-- select ... from 表A inner join 表B;
	-- 查询 有能够对应班级的学生以及班级信息

	


	-- 按照要求显示姓名、班级
	


	-- 给数据表起名字



	-- 查询 有能够对应班级的学生以及班级信息，显示学生的所有信息 students.*，只显示班级名称 classes.name.


	

	
	-- 在以上的查询中，将班级名显示在第1列


	-- 查询 有能够对应班级的学生以及班级信息, 按照班级名进行排序
	

	
	
	-- 当时同一个班级的时候，按照学生的id进行从小到大排序
	


	

-- 子查询
	-- 标量子查询: 子查询返回的结果是一个数据(一行一列)
	-- 列子查询: 返回的结果是一列(一列多行)
	-- 行子查询: 返回的结果是一行(一行多列)
	
	-- 查询出高于平均身高的信息(height)
	

	



	-- 查询学生的班级号能够对应的 学生名字
	-- select * from students where cls_id in(1,2);
	-- select id from classes;



