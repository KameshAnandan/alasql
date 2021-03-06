if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 306 XML reader', function() {

  it('0. Create database ',function(done){
    alasql('CREATE DATABASE test306;USE test306');
    done();
  });


  it('1. Read XML file / SEARCH like JSON',function(done){
    alasql('SEARCH children/"Worksheet" attributes [ss:Name] FROM XML("test306.xml")',[],function(res){
      assert.deepEqual(res,[ 'Sheet1', 'demo' ]);
      done();    
    });
  });

  it('2. Read XML file / SEARCH XML',function(done){
    alasql('SEARCH xml /Worksheet%[ss:Name] FROM XML("test306.xml")',[],function(res){
//      console.log(res);
      assert.deepEqual(res,[ 'Sheet1', 'demo' ]);
      done();    
    });
  });

   it('3. Read XML file / SEARCH XML',function(done){
     alasql('SEARCH XML /+Data$ FROM XML("test306.xml")',[],function(res){
//       console.log(res);
        assert.deepEqual(res,[ 'aaaa', '2', '3', '5', '6', '7' ]);
       done();    
     });
 });

   it('4. Read XML file / SEARCH XML',function(done){
     alasql('SEARCH XML /+Data$ ok(_>3) FROM XML("test306.xml")',[],function(res){
        assert.deepEqual(res,['5', '6', '7' ]);
       done();    
     });
 });

   it('5. Read XML file / SEARCH XML',function(done){
     alasql('SEARCH xml %xmlns FROM XML("test306.xml")',[],function(res){
//      console.log(res);
        assert.deepEqual(res,[ 'urn:schemas-microsoft-com:office:spreadsheet' ]);
       done();    
     });
   });

   it('6. Read GEFX file / SEARCH XML',function(done){
     alasql('SEARCH XML /graph/nodes/% {[$id]:id,name:label} FROM XML("test306a.xml")',[],function(res){
        assert.deepEqual(res, [{"$id":"0","name":"Hello"},{"$id":"1","name":"Word"}]);
       done();    
     });
   });
  it('7. Edges ',function(done){

     alasql('SEARCH XML /graph/edges/% FROM XML("test306a.xml")',[],function(res){
//        console.log(res);
         assert.deepEqual(res, [ { id: '0', source: '0', target: '1' } ]);
       done();    
     });
   });

  it('7. SEARCH INTO ',function(done){
     alasql('SEARCH XML /graph/edges/% INTO CSV({headers:true}) FROM XML("test306a.xml")',[],function(res){
//        console.log('>>',res,'<<');
        assert(res == "id,source,target\n0,0,1\n");
//         assert.deepEqual(res, [ { id: '0', source: '0', target: '1' } ]);
       done();    
     });
   });


  it('99. Drop database ',function(done){
    alasql('DROP DATABASE test306');
    done();
  });

});

