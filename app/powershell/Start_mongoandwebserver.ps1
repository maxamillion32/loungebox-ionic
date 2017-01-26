$mongodbsvc = Start-Process -FilePath "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" -ArgumentList "--dbpath C:\Data\MongoDB" -WindowStyle Maximized

$args = '/site:tinypots', '/config:C:\Users\Anwar\Documents\Visual Studio 2015\Projects\loungebox\loungebox\.vs\config\applicationhost.config'
$exe ="C:\Program Files\IIS Express\iisexpress.exe"
& $exe $args


Stop-Process $mongodbsvc