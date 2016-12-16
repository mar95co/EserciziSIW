package servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import logic.Contatto;

public class ContattiServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
//	private List<Contatto> contatti;

	@Override
	public void init() throws ServletException {
//		contatti = new ArrayList<Contatto>();		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html");
		final String apriTable = "<table align=" + "center" + "><thead><th> Nome </th><th> Cognome </th>"
				+ "<th> Telefono </th><th> Email </th></thead><tbody>";
		final String chiudiTable = "</tbody></table>";
		final String apriTr = "<tr>";
		final String chiudiTr = "</tr>";
		final String apriTd = "<td>";
		final String chiudiTd = "</td>";
		
		final StringBuilder builder = new StringBuilder();
		builder.append(apriTable);
		
		HttpSession session = req.getSession();
		List<Contatto> contatti = (List<Contatto>) session.getAttribute("contatti");
		if (contatti == null) {
			contatti = new ArrayList<Contatto>();
			session.setAttribute("contatti", contatti);
		}
		
		for (Contatto e : contatti) {
			builder.append(apriTr + apriTd + e.getNome() + chiudiTd);
			builder.append(apriTd + e.getCognome() + chiudiTd);
			builder.append(apriTd + e.getTelefono() + chiudiTd);
			builder.append(apriTd + e.getEmail() + chiudiTd + chiudiTr);
		}
		builder.append(chiudiTable);
		resp.getWriter().println(builder);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		final String nome = req.getParameter("nome");
		final String cognome = req.getParameter("cognome");
		final String telefono = req.getParameter("telefono");
		final String email = req.getParameter("email");
		final Contatto c = new Contatto(nome, cognome, telefono, email);
//		contatti.add(new Contatto(nome, cognome, telefono, email));
		HttpSession session = req.getSession();
		List<Contatto> contatti = (List<Contatto>) session.getAttribute("contatti");
		if (contatti == null) {
			contatti = new ArrayList<Contatto>();
			session.setAttribute("contatti", contatti);
		}
		contatti.add(c);
		final RequestDispatcher view = req.getRequestDispatcher("contatti.html");
		view.forward(req, resp);
	}
}
