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

  populaFormulario(dados, form){
    form.setValue({
      nome: null,
      email: null,
      cep: dados.cep,
      numero: '',
      complemento: dados.complemento,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

}
