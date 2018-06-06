import { map, subscribeOn } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  onSubmit(form){
    console.log(form.value);
  }
  
  constructor(private http: Http) { }

  ngOnInit() {
  }

  consultaCEP(cep, form){

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

       //Valida o formato do CEP.
       if(validacep.test(cep)) {

        this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(dados => this.populaFormulario(dados.json(), form));

        // //Consulta o webservice viacep.com.br/
        // $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
        
        //   }
       }

    }

  }

  populaFormulario(dados, formulario){
    
    // setValue() altera o valor de todos os campos do formulário

    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   cep: dados.cep,
    //   numero: '',
    //   complemento: dados.complemento,
    //   rua: dados.logradouro,
    //   bairro: dados.bairro,
    //   cidade: dados.localidade,
    //   estado: dados.uf
    // });

    // patchValue() adiciona o valor de apenas alguns campos ao formulário
    formulario.form.patchValue({
      cep: dados.cep,
      complemento: dados.complemento,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
    
  }

}
